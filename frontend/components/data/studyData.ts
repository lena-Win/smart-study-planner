import type {
  FocusSession,
  FocusSubject,
  JournalEntry,
  PlannerTask,
} from "./types"

/* =========================================================
   STORAGE KEYS
========================================================= */

export const STUDY_STORAGE_KEYS = {
  focusSubjects:
    "study-zen-focus-subjects",

  focusSessions:
    "study-zen-focus-sessions",

  plannerTasks:
    "study-zen-planner-calendar-tasks",

  plannerIntention:
    "study-zen-monthly-intention",

  journalEntries:
    "study-zen-journal",
} as const

/* =========================================================
   SAFE LOCAL STORAGE
========================================================= */

function readStorage<T>(
  key: string,
  fallback: T
): T {
  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const raw =
      window.localStorage.getItem(key)

    if (!raw) {
      return fallback
    }

    return JSON.parse(raw) as T
  } catch (error) {
    console.error(
      `Could not read Study Zen storage: ${key}`,
      error
    )

    return fallback
  }
}

function writeStorage<T>(
  key: string,
  value: T
) {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    )
  } catch (error) {
    console.error(
      `Could not save Study Zen storage: ${key}`,
      error
    )
  }
}

/* =========================================================
   FOCUS
========================================================= */

export function getFocusSubjects() {
  return readStorage<FocusSubject[]>(
    STUDY_STORAGE_KEYS.focusSubjects,
    []
  )
}

export function saveFocusSubjects(
  subjects: FocusSubject[]
) {
  writeStorage(
    STUDY_STORAGE_KEYS.focusSubjects,
    subjects
  )
}

export function getFocusSessions() {
  return readStorage<FocusSession[]>(
    STUDY_STORAGE_KEYS.focusSessions,
    []
  )
}

export function saveFocusSessions(
  sessions: FocusSession[]
) {
  writeStorage(
    STUDY_STORAGE_KEYS.focusSessions,
    sessions
  )
}

/* =========================================================
   PLANNER
========================================================= */

export function getPlannerTasks() {
  return readStorage<PlannerTask[]>(
    STUDY_STORAGE_KEYS.plannerTasks,
    []
  )
}

export function savePlannerTasks(
  tasks: PlannerTask[]
) {
  writeStorage(
    STUDY_STORAGE_KEYS.plannerTasks,
    tasks
  )
}

export function getPlannerIntention() {
  if (typeof window === "undefined") {
    return ""
  }

  return (
    window.localStorage.getItem(
      STUDY_STORAGE_KEYS.plannerIntention
    ) ?? ""
  )
}

export function savePlannerIntention(
  intention: string
) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(
    STUDY_STORAGE_KEYS.plannerIntention,
    intention
  )
}

/* =========================================================
   JOURNAL
========================================================= */

export function getJournalEntries() {
  return readStorage<JournalEntry[]>(
    STUDY_STORAGE_KEYS.journalEntries,
    []
  )
}

export function saveJournalEntries(
  entries: JournalEntry[]
) {
  writeStorage(
    STUDY_STORAGE_KEYS.journalEntries,
    entries
  )
}