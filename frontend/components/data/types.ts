import type { MoodId } from "@/components/mood/moodData"

/* =========================================================
   FOCUS
========================================================= */

export type FocusSubject = {
  id: string
  name: string
  color: string
}

export type FocusSession = {
  id: string
  subjectId: string
  subjectName: string
  duration: number
  completedAt: string
  mood: MoodId
}

/* =========================================================
   PLANNER
========================================================= */

export type PlannerTask = {
  id: string

  text: string

  // YYYY-MM-DD
  date: string

  // HH:mm
  time: string

  color: string

  completed: boolean

  createdAt: string
}

/* =========================================================
   JOURNAL
========================================================= */

export type JournalEntry = {
  id: string
  text: string
  mood: MoodId
  prompt: string | null
  createdAt: string
}

/* =========================================================
   GARDEN
========================================================= */

export type GardenSource =
  | "focus"
  | "planner"
  | "journal"

export type GardenGrowthEvent = {
  id: string
  source: GardenSource
  mood: MoodId
  createdAt: string
  value: number
}

/* =========================================================
   COMPLETE STUDY DATA
========================================================= */

export type StudyData = {
  focus: {
    subjects: FocusSubject[]
    sessions: FocusSession[]
  }

  planner: {
    tasks: PlannerTask[]
    monthlyIntention: string
  }

  journal: {
    entries: JournalEntry[]
  }
}
