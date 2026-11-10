import { describe, expect, it } from "vitest"

import {
  isFocusSubject,
  isFocusSession,
  isPlannerTask,
  isJournalEntry,
} from "./studyData"

describe("Study Zen — data validation", () => {
  it("accepts a valid Focus subject", () => {
    const subject = {
      id: "subject-1",
      name: "Mathematics",
      color: "#a8c5b5",
    }

    expect(isFocusSubject(subject)).toBe(true)
  })

  it("rejects an invalid Focus subject", () => {
    const subject = {
      id: 123,
      name: "Mathematics",
      color: "#a8c5b5",
    }

    expect(isFocusSubject(subject)).toBe(false)
  })

  it("accepts a valid Focus session", () => {
    const session = {
      id: "session-1",
      subjectId: "subject-1",
      subjectName: "Mathematics",
      duration: 25,
      completedAt: new Date().toISOString(),
      mood: "focus",
    }

    expect(isFocusSession(session)).toBe(true)
  })

  it("rejects a Focus session with invalid duration", () => {
    const session = {
      id: "session-1",
      subjectId: "subject-1",
      subjectName: "Mathematics",
      duration: "25",
      completedAt: new Date().toISOString(),
      mood: "focus",
    }

    expect(isFocusSession(session)).toBe(false)
  })

  it("accepts a valid Planner task", () => {
    const task = {
      id: "task-1",
      text: "Study mathematics",
      date: "2026-11-10",
      time: "14:00",
      color: "#a8c5b5",
      completed: false,
      createdAt: new Date().toISOString(),
    }

    expect(isPlannerTask(task)).toBe(true)
  })

  it("rejects a Planner task with invalid completion status", () => {
    const task = {
      id: "task-1",
      text: "Study mathematics",
      date: "2026-11-10",
      time: "14:00",
      color: "#a8c5b5",
      completed: "false",
      createdAt: new Date().toISOString(),
    }

    expect(isPlannerTask(task)).toBe(false)
  })

  it("accepts a valid Journal entry", () => {
    const entry = {
      id: "entry-1",
      text: "Today was productive.",
      mood: "calm",
      prompt: null,
      createdAt: new Date().toISOString(),
    }

    expect(isJournalEntry(entry)).toBe(true)
  })

  it("rejects a Journal entry with invalid mood", () => {
    const entry = {
      id: "entry-1",
      text: "Today was productive.",
      mood: "unknown",
      prompt: null,
      createdAt: new Date().toISOString(),
    }

    expect(isJournalEntry(entry)).toBe(false)
  })
})