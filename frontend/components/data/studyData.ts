import type {
  FocusSession,
  FocusSubject,
  JournalEntry,
  PlannerTask,
} from "./types"

export const STUDY_STORAGE_KEYS = {
  focusSubjects: "study-zen-focus-subjects",
  focusSessions: "study-zen-focus-sessions",
  plannerTasks: "study-zen-planner-calendar-tasks",
  plannerIntention: "study-zen-monthly-intention",
  journalEntries: "study-zen-journal",
} as const

type Validator<T> = (value: unknown) => value is T

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isMood(value: unknown): value is FocusSession["mood"] {
  return value === "calm" ||
    value === "focus" ||
    value === "reflect" ||
    value === "restore"
}

function isFocusSubject(value: unknown): value is FocusSubject {
  if (!isRecord(value)) return false
  return typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.color === "string"
}

function isFocusSession(value: unknown): value is FocusSession {
  if (!isRecord(value)) return false
  return typeof value.id === "string" &&
    typeof value.subjectId === "string" &&
    typeof value.subjectName === "string" &&
    typeof value.duration === "number" &&
    Number.isFinite(value.duration) &&
    typeof value.completedAt === "string" &&
    isMood(value.mood)
}

function isPlannerTask(value: unknown): value is PlannerTask {
  if (!isRecord(value)) return false
  return typeof value.id === "string" &&
    typeof value.text === "string" &&
    typeof value.date === "string" &&
    typeof value.time === "string" &&
    typeof value.color === "string" &&
    typeof value.completed === "boolean" &&
    typeof value.createdAt === "string"
}

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!isRecord(value)) return false
  return typeof value.id === "string" &&
    typeof value.text === "string" &&
    isMood(value.mood) &&
    (value.prompt === null || typeof value.prompt === "string") &&
    typeof value.createdAt === "string"
}

function readArrayStorage<T>(
  key: string,
  validate: Validator<T>
): T[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn(`Invalid Study Zen storage format: ${key}`)
      return []
    }
    return parsed.filter(validate)
  } catch (error) {
    console.error(`Could not read Study Zen storage: ${key}`, error)
    return []
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Could not save Study Zen storage: ${key}`, error)
  }
}

export function getFocusSubjects(): FocusSubject[] {
  return readArrayStorage(STUDY_STORAGE_KEYS.focusSubjects, isFocusSubject)
}

export function saveFocusSubjects(subjects: FocusSubject[]): void {
  writeStorage(STUDY_STORAGE_KEYS.focusSubjects, subjects)
}

export function getFocusSessions(): FocusSession[] {
  return readArrayStorage(STUDY_STORAGE_KEYS.focusSessions, isFocusSession)
}

export function saveFocusSessions(sessions: FocusSession[]): void {
  writeStorage(STUDY_STORAGE_KEYS.focusSessions, sessions)
}

export function getPlannerTasks(): PlannerTask[] {
  return readArrayStorage(STUDY_STORAGE_KEYS.plannerTasks, isPlannerTask)
}

export function savePlannerTasks(tasks: PlannerTask[]): void {
  writeStorage(STUDY_STORAGE_KEYS.plannerTasks, tasks)
}

export function getPlannerIntention(): string {
  if (typeof window === "undefined") return ""
  try {
    return window.localStorage.getItem(STUDY_STORAGE_KEYS.plannerIntention) ?? ""
  } catch (error) {
    console.error("Could not read Study Zen planner intention", error)
    return ""
  }
}

export function savePlannerIntention(intention: string): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STUDY_STORAGE_KEYS.plannerIntention, intention)
  } catch (error) {
    console.error("Could not save Study Zen planner intention", error)
  }
}

export function getJournalEntries(): JournalEntry[] {
  return readArrayStorage(STUDY_STORAGE_KEYS.journalEntries, isJournalEntry)
}

export function saveJournalEntries(entries: JournalEntry[]): void {
  writeStorage(STUDY_STORAGE_KEYS.journalEntries, entries)
}