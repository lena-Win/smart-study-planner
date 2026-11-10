import { describe, expect, it } from "vitest"
import { validateStudyZenBackup } from "./backup"

const validBackup = {
  version: 1,
  exportedAt: "2026-11-10T12:00:00.000Z",
  data: {
    focusSubjects: [],
    focusSessions: [],
    plannerTasks: [],
    plannerIntention: "",
    journalEntries: [],
  },
}

describe("Study Zen — backup validation", () => {
  it("accepts a valid backup", () => {
    expect(validateStudyZenBackup(validBackup)).toBe(true)
  })

  it("rejects an unsupported backup version", () => {
    expect(
      validateStudyZenBackup({ ...validBackup, version: 99 })
    ).toBe(false)
  })

  it("rejects a backup with missing data", () => {
    expect(
      validateStudyZenBackup({ version: 1 })
    ).toBe(false)
  })

  it("rejects invalid Planner tasks", () => {
    const backup = {
      ...validBackup,
      data: {
        ...validBackup.data,
        plannerTasks: [{ id: 123 }],
      },
    }

    expect(validateStudyZenBackup(backup)).toBe(false)
  })

  it("rejects invalid Journal entries", () => {
    const backup = {
      ...validBackup,
      data: {
        ...validBackup.data,
        journalEntries: [{ mood: "unknown" }],
      },
    }

    expect(validateStudyZenBackup(backup)).toBe(false)
  })
})