import {
  STUDY_STORAGE_KEYS,
  getFocusSubjects,
  getFocusSessions,
  getPlannerTasks,
  getPlannerIntention,
  getJournalEntries,
  isFocusSubject,
  isFocusSession,
  isPlannerTask,
  isJournalEntry,
} from "./studyData"

const BACKUP_VERSION = 1

type BackupData = {
  version: number
  exportedAt: string
  data: {
    focusSubjects: ReturnType<typeof getFocusSubjects>
    focusSessions: ReturnType<typeof getFocusSessions>
    plannerTasks: ReturnType<typeof getPlannerTasks>
    plannerIntention: string
    journalEntries: ReturnType<typeof getJournalEntries>
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function exportStudyZenData(): void {
  const backup: BackupData = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data: {
      focusSubjects: getFocusSubjects(),
      focusSessions: getFocusSessions(),
      plannerTasks: getPlannerTasks(),
      plannerIntention: getPlannerIntention(),
      journalEntries: getJournalEntries(),
    },
  }

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = `study-zen-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`

  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function validateStudyZenBackup(value: unknown): value is BackupData {
  if (!isRecord(value)) return false

  if (value.version !== BACKUP_VERSION) return false
  if (typeof value.exportedAt !== "string") return false
  if (!isRecord(value.data)) return false

  const data = value.data

  return (
    Array.isArray(data.focusSubjects) &&
    data.focusSubjects.every(isFocusSubject) &&
    Array.isArray(data.focusSessions) &&
    data.focusSessions.every(isFocusSession) &&
    Array.isArray(data.plannerTasks) &&
    data.plannerTasks.every(isPlannerTask) &&
    typeof data.plannerIntention === "string" &&
    Array.isArray(data.journalEntries) &&
    data.journalEntries.every(isJournalEntry)
  )
}

export function importStudyZenData(backup: BackupData): void {
  if (!validateStudyZenBackup(backup)) {
    throw new Error("Invalid Study Zen backup file.")
  }

  const data = backup.data

  const entries = [
    [STUDY_STORAGE_KEYS.focusSubjects, data.focusSubjects],
    [STUDY_STORAGE_KEYS.focusSessions, data.focusSessions],
    [STUDY_STORAGE_KEYS.plannerTasks, data.plannerTasks],
    [STUDY_STORAGE_KEYS.plannerIntention, data.plannerIntention],
    [STUDY_STORAGE_KEYS.journalEntries, data.journalEntries],
  ] as const

  const previousValues = entries.map(([key]) => [
    key,
    localStorage.getItem(key),
  ] as const)

  try {
    for (const [key, value] of entries) {
      localStorage.setItem(
        key,
        key === STUDY_STORAGE_KEYS.plannerIntention
          ? (value as string)
          : JSON.stringify(value)
      )
    }
  } catch (error) {
    for (const [key, previousValue] of previousValues) {
      try {
        if (previousValue === null) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, previousValue)
        }
      } catch (rollbackError) {
        console.error("Could not restore previous data:", rollbackError)
      }
    }

    throw error
  }
}