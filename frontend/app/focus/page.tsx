"use client"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Target,
  Waves,
  Feather,
  MoonStar,
  Timer,
  CalendarDays,
  Flame,
  Clock3,
  Sprout,
} from "lucide-react"
import AppShell from "@/components/layout/AppShell"
import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"
import type { MoodId } from "@/components/mood/moodData"
import type {
  FocusSession,
  FocusSubject,
} from "@/components/data/types"
import {
  getFocusSessions,
  getFocusSubjects,
  saveFocusSessions,
  saveFocusSubjects,
} from "@/components/data/studyData"
/* =========================================================
   TYPES
========================================================= */
type FocusMoodContent = {
  eyebrow: string
  title: string
  description: string
  image: string
  imageLabel: string
  icon: React.ElementType
}
/* =========================================================
   MOOD CONTENT
========================================================= */
const focusContent: Record<MoodId, FocusMoodContent> = {
  calm: {
    eyebrow: "Gentle concentration",
    title: "Calm Sanctuary",
    description:
      "Focus without pressure. Move through one task at a time with a softer, steadier rhythm.",
    image: "/images/moods/calm/focus.jpg",
    imageLabel: "Quiet focus, steady rhythm",
    icon: Waves,
  },
  focus: {
    eyebrow: "Deep concentration",
    title: "Focus Sanctuary",
    description:
      "Protect your attention, reduce distraction and create space for meaningful deep work.",
    image: "/images/moods/focus/focus-focus.jpg",
    imageLabel: "A space built for deep work",
    icon: Target,
  },
  reflect: {
    eyebrow: "Creative concentration",
    title: "Reflect Sanctuary",
    description:
      "Give ideas enough quiet to develop. A softer space for writing, thinking and creative work.",
    image: "/images/moods/reflect/reflect-focus.jpg",
    imageLabel: "Room for ideas to unfold",
    icon: Feather,
  },
  restore: {
    eyebrow: "Low-pressure focus",
    title: "Restore Sanctuary",
    description:
      "Work with the energy you have. Keep the pace gentle and leave room for recovery.",
    image: "/images/moods/restore/restore-focus.jpg",
    imageLabel: "Gentle work without pressure",
    icon: MoonStar,
  },
}
/* =========================================================
   THEME EFFECTS
   Forest intentionally removed.
========================================================= */
const themeEffects = {
  morning: {
    imageFilter:
      "brightness(1.08) saturate(0.92) contrast(0.96)",
    overlay:
      "linear-gradient(120deg, rgba(255,246,226,.10), rgba(255,255,255,.01) 50%, rgba(255,236,205,.12))",
    crystal:
      "rgba(255,255,255,0.26)",
    crystalStrong:
      "rgba(255,255,255,0.40)",
    border:
      "rgba(255,255,255,0.50)",
  },
  sunset: {
    imageFilter:
      "brightness(0.96) saturate(1.03) sepia(0.09)",
    overlay:
      "linear-gradient(120deg, rgba(173,100,76,.16), rgba(216,155,120,.04) 50%, rgba(105,73,92,.13))",
    crystal:
      "rgba(255,247,242,0.24)",
    crystalStrong:
      "rgba(255,247,242,0.38)",
    border:
      "rgba(255,255,255,0.40)",
  },
  night: {
    imageFilter:
      "brightness(0.58) saturate(0.74) contrast(1.08)",
    overlay:
      "linear-gradient(120deg, rgba(18,28,48,.38), rgba(31,42,63,.20) 50%, rgba(11,20,36,.42))",
    crystal:
      "rgba(22,29,44,0.34)",
    crystalStrong:
      "rgba(24,31,47,0.52)",
    border:
      "rgba(255,255,255,0.12)",
  },
} as const
type SupportedFocusTheme = keyof typeof themeEffects
/* =========================================================
   CONSTANTS
========================================================= */
const sessionOptions = [25, 45, 60] as const
const subjectColors = [
  "#5E82AC",
  "#7F9568",
  "#B77E91",
  "#84715D",
  "#9D8DB5",
  "#607B73",
]
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})
const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
})
/* =========================================================
   HELPERS
========================================================= */
function dateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours === 0) {
    return `${minutes}m`
  }
  if (minutes === 0) {
    return `${hours}h`
  }
  return `${hours}h ${minutes}m`
}
function getCalendarDays(month: Date) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const lastDay = new Date(year, monthIndex + 1, 0)
  // Monday = 0
  const offset = (firstDay.getDay() + 6) % 7
  const cells: (Date | null)[] = []
  for (let i = 0; i < offset; i += 1) {
    cells.push(null)
  }
  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    cells.push(new Date(year, monthIndex, day))
  }
  while (cells.length % 7 !== 0) {
    cells.push(null)
  }
  return cells
}
function calculateStreak(sessions: FocusSession[]) {
  if (sessions.length === 0) {
    return 0
  }
  const activeDays = new Set(
    sessions.map((session) =>
      dateKey(new Date(session.completedAt))
    )
  )
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  let cursor: Date
  if (activeDays.has(dateKey(today))) {
    cursor = new Date(today)
  } else if (activeDays.has(dateKey(yesterday))) {
    cursor = new Date(yesterday)
  } else {
    return 0
  }
  let streak = 0
  while (activeDays.has(dateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}
/* =========================================================
   PAGE
========================================================= */
export default function FocusPage() {
  const { mood } = useMood()
  const { theme } = useTheme()
  const current = focusContent[mood]
  const SanctuaryIcon = current.icon
  /*
    Forest is being removed from the app.
    This fallback prevents Focus from crashing while the
    rest of ThemeContext is being cleaned up.
  */
  const supportedTheme: SupportedFocusTheme =
    theme === "night"
      ? "night"
      : theme === "sunset"
        ? "sunset"
        : "morning"
  const currentTheme = themeEffects[supportedTheme]
  const isNight = supportedTheme === "night"
  /* =========================
     TIMER
  ========================= */
  const [selectedMinutes, setSelectedMinutes] =
    useState<number>(25)
  const [secondsLeft, setSecondsLeft] =
    useState<number>(25 * 60)
  const [isRunning, setIsRunning] =
    useState(false)
  const intervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null)
  const sessionSavedRef = useRef(false)
  /* =========================
     SUBJECTS
  ========================= */
  const [subjects, setSubjects] = useState<FocusSubject[]>([])
  const [selectedSubjectId, setSelectedSubjectId] =
    useState("")
  const [showAddSubject, setShowAddSubject] =
    useState(false)
  const [newSubjectName, setNewSubjectName] =
    useState("")
  const [newSubjectColor, setNewSubjectColor] =
    useState(subjectColors[0])
  /* =========================
     SESSIONS
  ========================= */
  const [sessions, setSessions] =
    useState<FocusSession[]>([])
  /* =========================
     CALENDAR
  ========================= */
  const [visibleMonth, setVisibleMonth] =
    useState(() => {
      const now = new Date()
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    })
  const [selectedDay, setSelectedDay] =
    useState<string | null>(null)
  /* =========================================================
     LOAD STORAGE
  ========================================================= */
  useEffect(() => {
    const storedSubjects = getFocusSubjects()
    const storedSessions = getFocusSessions()
    setSubjects(storedSubjects)
    setSessions(storedSessions)
    if (storedSubjects.length > 0) {
      setSelectedSubjectId(storedSubjects[0].id)
    }
  }, [])
  /* =========================================================
     TIMER EFFECT
  ========================================================= */
  useEffect(() => {
    if (!isRunning) {
      return
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((previous) => {
        if (previous <= 1) {
          setIsRunning(false)
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return 0
        }
        return previous - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])
  /* =========================================================
     SAVE COMPLETED SESSION
  ========================================================= */
  useEffect(() => {
    if (secondsLeft !== 0) {
      return
    }
    if (sessionSavedRef.current) {
      return
    }
    const subject = subjects.find(
      (item) => item.id === selectedSubjectId
    )
    if (!subject) {
      return
    }
    const completedSession: FocusSession = {
      id: crypto.randomUUID(),
      subjectId: subject.id,
      subjectName: subject.name,
      duration: selectedMinutes,
      completedAt: new Date().toISOString(),
      mood,
    }
    const updatedSessions = [
      ...sessions,
      completedSession,
    ]
    setSessions(updatedSessions)
    saveFocusSessions(updatedSessions)
    sessionSavedRef.current = true
  }, [
    secondsLeft,
    selectedMinutes,
    selectedSubjectId,
    subjects,
    sessions,
    mood,
  ])
  /* =========================================================
     TIMER ACTIONS
  ========================================================= */
  const changeSessionLength = (minutes: number) => {
    setSelectedMinutes(minutes)
    setSecondsLeft(minutes * 60)
    setIsRunning(false)
    sessionSavedRef.current = false
  }
  const resetTimer = () => {
    setSecondsLeft(selectedMinutes * 60)
    setIsRunning(false)
    sessionSavedRef.current = false
  }
  const toggleTimer = () => {
    if (!selectedSubjectId) {
      setShowAddSubject(true)
      return
    }
    if (secondsLeft === 0) {
      return
    }
    setIsRunning((previous) => !previous)
  }
  /* =========================================================
     ADD SUBJECT
  ========================================================= */
  const addSubject = () => {
    const trimmedName = newSubjectName.trim()
    if (!trimmedName) {
      return
    }
    const newSubject: FocusSubject = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color: newSubjectColor,
    }
    const updatedSubjects = [
      ...subjects,
      newSubject,
    ]
    setSubjects(updatedSubjects)
    setSelectedSubjectId(newSubject.id)
    saveFocusSubjects(updatedSubjects)
    setNewSubjectName("")
    setNewSubjectColor(subjectColors[0])
    setShowAddSubject(false)
  }
  /* =========================================================
     TIMER VALUES
  ========================================================= */
  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`
  const totalSeconds = selectedMinutes * 60
  const progress =
    totalSeconds === 0
      ? 0
      : ((totalSeconds - secondsLeft) /
          totalSeconds) *
        100
  /* =========================================================
     STATISTICS
  ========================================================= */
  const currentMonthSessions = useMemo(() => {
    return sessions.filter((session) => {
      const date = new Date(session.completedAt)
      return (
        date.getFullYear() ===
          visibleMonth.getFullYear() &&
        date.getMonth() === visibleMonth.getMonth()
      )
    })
  }, [sessions, visibleMonth])
  const thisMonthMinutes = useMemo(() => {
    const now = new Date()
    return sessions
      .filter((session) => {
        const date = new Date(session.completedAt)
        return (
          date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth()
        )
      })
      .reduce(
        (total, session) =>
          total + session.duration,
        0
      )
  }, [sessions])
  const currentStreak = useMemo(
    () => calculateStreak(sessions),
    [sessions]
  )
  const minutesByDay = useMemo(() => {
    const map: Record<string, number> = {}
    currentMonthSessions.forEach((session) => {
      const key = dateKey(
        new Date(session.completedAt)
      )
      map[key] =
        (map[key] ?? 0) + session.duration
    })
    return map
  }, [currentMonthSessions])
  const subjectStats = useMemo(() => {
    const map: Record<
      string,
      {
        name: string
        minutes: number
        color: string
      }
    > = {}
    sessions.forEach((session) => {
      const subject = subjects.find(
        (item) => item.id === session.subjectId
      )
      if (!map[session.subjectId]) {
        map[session.subjectId] = {
          name: session.subjectName,
          minutes: 0,
          color:
            subject?.color ?? "var(--mood-main)",
        }
      }
      map[session.subjectId].minutes +=
        session.duration
    })
    return Object.values(map).sort(
      (a, b) => b.minutes - a.minutes
    )
  }, [sessions, subjects])
  const maxSubjectMinutes =
    subjectStats.length > 0
      ? Math.max(
          ...subjectStats.map(
            (subject) => subject.minutes
          )
        )
      : 0
  const calendarDays =
    getCalendarDays(visibleMonth)
  const selectedDaySessions =
    selectedDay === null
      ? []
      : sessions.filter(
          (session) =>
            dateKey(
              new Date(session.completedAt)
            ) === selectedDay
        )
  const selectedDayTotal =
    selectedDaySessions.reduce(
      (total, session) =>
        total + session.duration,
      0
    )
  /* =========================================================
     RENDER
  ========================================================= */
  return (
    <AppShell>
      <main
        className="
          relative
          overflow-hidden
          pt-8
          lg:pt-12
          pb-24
        "
      >
        {/* AMBIENT BACKGROUND */}
        <div
          className="
            fixed
            top-[8%]
            right-[4%]
            w-[520px]
            h-[520px]
            rounded-full
            blur-[150px]
            opacity-35
            pointer-events-none
          "
          style={{
            background: "var(--mood-glow)",
          }}
        />
        <div className="relative z-10">
          {/* =================================================
              HEADER + ATMOSPHERE
          ================================================= */}
          <section className="mb-16">
            <div
              className="
                grid
                xl:grid-cols-[0.9fr_1.1fr]
                gap-10
                xl:gap-16
                items-end
              "
            >
              <div className="pb-3">
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 14%, transparent)",
                    color: "var(--mood-main)",
                  }}
                >
                  <SanctuaryIcon size={21} />
                </div>
                <p
                  className="
                    uppercase
                    tracking-[0.32em]
                    text-sm
                    mb-4
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  {current.eyebrow}
                </p>
                <h1
                  className="
                    text-6xl
                    xl:text-7xl
                    text-primary
                    mb-5
                  "
                >
                  {current.title}
                </h1>
                <p
                  className="
                    text-lg
                    text-secondary
                    max-w-xl
                    leading-relaxed
                  "
                >
                  {current.description}
                </p>
              </div>
              {/* OPEN ATMOSPHERE IMAGE */}
              <div
                className="
                  relative
                  min-h-[360px]
                  lg:min-h-[420px]
                  overflow-hidden
                  rounded-[34px]
                "
              >
                <img
                  src={current.image}
                  alt={`${current.title} atmosphere`}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                  "
                  style={{
                    filter: currentTheme.imageFilter,
                  }}
                />
                <div
                  className="
                    absolute
                    inset-0
                    pointer-events-none
                  "
                  style={{
                    background: currentTheme.overlay,
                  }}
                />
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/30
                    via-transparent
                    to-transparent
                  "
                />
                <p
                  className="
                    absolute
                    left-7
                    bottom-6
                    text-white/90
                    text-sm
                    tracking-[0.16em]
                    uppercase
                  "
                >
                  {current.imageLabel}
                </p>
              </div>
            </div>
          </section>
          {/* =================================================
              SESSION HEADER
          ================================================= */}
          <section className="mb-7">
            <div
              className="
                flex
                flex-col
                lg:flex-row
                lg:items-end
                lg:justify-between
                gap-6
              "
            >
              <div>
                <p
                  className="
                    uppercase
                    tracking-[0.3em]
                    text-xs
                    mb-3
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  Focus session
                </p>
                <h2 className="text-5xl text-primary">
                  What are you working on?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSubject(true)}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-full
                  border
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  cursor-pointer
                "
                style={{
                  background: currentTheme.crystal,
                  borderColor: currentTheme.border,
                  color: isNight
                    ? "rgba(255,255,255,.84)"
                    : "var(--text-primary)",
                }}
              >
                <Plus size={17} />
                Add subject / project
              </button>
            </div>
          </section>
          {/* =================================================
              SUBJECT SELECTOR
          ================================================= */}
          <section className="mb-8">
            {subjects.length > 0 ? (
              <div
                className="
                  flex
                  gap-3
                  overflow-x-auto
                  pb-2
                "
              >
                {subjects.map((subject) => {
                  const active =
                    selectedSubjectId === subject.id
                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() =>
                        setSelectedSubjectId(subject.id)
                      }
                      className="
                        shrink-0
                        inline-flex
                        items-center
                        gap-3
                        px-5
                        py-3
                        rounded-full
                        border
                        transition-all
                        duration-300
                        cursor-pointer
                      "
                      style={{
                        background: active
                          ? `color-mix(in srgb, ${subject.color} 18%, transparent)`
                          : currentTheme.crystal,
                        borderColor: active
                          ? subject.color
                          : currentTheme.border,
                        color: isNight
                          ? "rgba(255,255,255,.86)"
                          : "var(--text-primary)",
                      }}
                    >
                      <span
                        className="
                          w-2.5
                          h-2.5
                          rounded-full
                        "
                        style={{
                          background: subject.color,
                        }}
                      />
                      {subject.name}
                      {active && (
                        <Check size={15} />
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddSubject(true)}
                className="
                  w-full
                  min-h-[110px]
                  border
                  border-dashed
                  rounded-[28px]
                  flex
                  items-center
                  justify-center
                  gap-3
                  cursor-pointer
                  transition-all
                  duration-300
                "
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--mood-main) 35%, transparent)",
                  color: "var(--mood-main)",
                }}
              >
                <Plus size={19} />
                Add your first subject or project
              </button>
            )}
          </section>
          {/* =================================================
              CRYSTAL TIMER
          ================================================= */}
          <section
            className="
              relative
              overflow-hidden
              min-h-[610px]
              rounded-[48px]
              border
              backdrop-blur-[40px]
              flex
              items-center
              justify-center
              px-6
              py-14
              mb-20
            "
            style={{
              background: `
                radial-gradient(
                  circle at 15% 10%,
                  color-mix(
                    in srgb,
                    var(--mood-glow) 45%,
                    transparent
                  ),
                  transparent 38%
                ),
                radial-gradient(
                  circle at 90% 90%,
                  color-mix(
                    in srgb,
                    var(--mood-secondary) 22%,
                    transparent
                  ),
                  transparent 42%
                ),
                ${currentTheme.crystal}
              `,
              borderColor: currentTheme.border,
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,.45),
                inset 0 -1px 0 rgba(255,255,255,.08),
                0 35px 100px
                color-mix(
                  in srgb,
                  var(--mood-glow) 18%,
                  transparent
                )
              `,
            }}
          >
            {/* CRYSTAL REFRACTION */}
            <div
              className="
                absolute
                -top-[220px]
                left-[10%]
                w-[520px]
                h-[520px]
                rounded-full
                blur-[110px]
                opacity-45
                pointer-events-none
              "
              style={{
                background: "var(--mood-glow)",
              }}
            />
            <div
              className="
                absolute
                -bottom-[260px]
                right-[5%]
                w-[560px]
                h-[560px]
                rounded-full
                blur-[130px]
                opacity-25
                pointer-events-none
              "
              style={{
                background:
                  "var(--mood-secondary)",
              }}
            />
            <div
              className="
                relative
                z-10
                w-full
                max-w-3xl
                text-center
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  mb-8
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                <Timer size={15} />
                Deep work
              </div>
              {/* SESSION LENGTH */}
              <div
                className="
                  flex
                  justify-center
                  flex-wrap
                  gap-2
                  mb-10
                "
              >
                {sessionOptions.map((option) => {
                  const active =
                    selectedMinutes === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        changeSessionLength(option)
                      }
                      disabled={isRunning}
                      className="
                        min-w-[82px]
                        px-4
                        py-2.5
                        rounded-full
                        border
                        text-sm
                        cursor-pointer
                        transition-all
                        duration-300
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                      style={{
                        background: active
                          ? "var(--mood-main)"
                          : currentTheme.crystal,
                        borderColor: active
                          ? "var(--mood-main)"
                          : currentTheme.border,
                        color: active
                          ? "white"
                          : isNight
                            ? "rgba(255,255,255,.68)"
                            : "var(--text-secondary)",
                      }}
                    >
                      {option} min
                    </button>
                  )
                })}
              </div>
              {/* TIMER */}
              <div
                className="
                  relative
                  mx-auto
                  w-[290px]
                  h-[290px]
                  sm:w-[350px]
                  sm:h-[350px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mb-9
                "
                style={{
                  background: `
                    conic-gradient(
                      var(--mood-main) ${progress}%,
                      color-mix(
                        in srgb,
                        var(--mood-main) 9%,
                        transparent
                      ) ${progress}%
                    )
                  `,
                  boxShadow:
                    "0 30px 90px color-mix(in srgb, var(--mood-glow) 28%, transparent)",
                }}
              >
                <div
                  className="
                    absolute
                    inset-[9px]
                    rounded-full
                    border
                    backdrop-blur-[40px]
                  "
                  style={{
                    background:
                      currentTheme.crystalStrong,
                    borderColor:
                      currentTheme.border,
                  }}
                />
                <div className="relative z-10">
                  <p
                    className="
                      uppercase
                      tracking-[0.26em]
                      text-[10px]
                      mb-4
                    "
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    {secondsLeft === 0
                      ? "Session complete"
                      : isRunning
                        ? "Stay with it"
                        : "Ready when you are"}
                  </p>
                  <h2
                    className="
                      text-[72px]
                      sm:text-[88px]
                      leading-none
                      tracking-[-0.06em]
                    "
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.96)"
                        : "var(--text-primary)",
                    }}
                  >
                    {formattedTime}
                  </h2>
                </div>
              </div>
              {/* CONTROLS */}
              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  gap-3
                  mb-10
                "
              >
                <button
                  type="button"
                  onClick={toggleTimer}
                  disabled={secondsLeft === 0}
                  className="
                    min-w-[180px]
                    px-7
                    py-4
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    text-white
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    active:scale-[0.98]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                  style={{
                    background: "var(--mood-main)",
                    boxShadow:
                      "0 16px 40px color-mix(in srgb, var(--mood-main) 25%, transparent)",
                  }}
                >
                  {isRunning ? (
                    <>
                      <Pause size={18} />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      {secondsLeft === totalSeconds
                        ? "Begin session"
                        : "Continue"}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="
                    px-7
                    py-4
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    border
                    backdrop-blur-xl
                    cursor-pointer
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                  "
                  style={{
                    background:
                      currentTheme.crystal,
                    borderColor:
                      currentTheme.border,
                    color: isNight
                      ? "rgba(255,255,255,.74)"
                      : "var(--text-primary)",
                  }}
                >
                  <RotateCcw size={17} />
                  Reset
                </button>
              </div>
              {/* PROGRESS */}
              <div className="max-w-xl mx-auto">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-3
                  "
                >
                  <span
                    className="
                      uppercase
                      tracking-[0.24em]
                      text-xs
                    "
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.52)"
                        : "var(--text-secondary)",
                    }}
                  >
                    Progress
                  </span>
                  <span
                    className="
                      text-sm
                      font-medium
                    "
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
                <div
                  className="
                    h-[7px]
                    rounded-full
                    overflow-hidden
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 10%, transparent)",
                  }}
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      transition-all
                      duration-500
                    "
                    style={{
                      width: `${progress}%`,
                      background:
                        "var(--mood-main)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
          {/* =================================================
              DEEP WORK
          ================================================= */}
          <section className="mb-20">
            <div className="mb-10">
              <p
                className="
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  mb-3
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                Your rhythm
              </p>
              <h2 className="text-5xl text-primary">
                Deep Work
              </h2>
            </div>
            {/* MAIN STATS — intentionally not cards */}
            <div
              className="
                grid
                sm:grid-cols-2
                gap-8
                mb-14
                max-w-3xl
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  <Clock3 size={18} />
                  <span
                    className="
                      uppercase
                      tracking-[0.22em]
                      text-xs
                    "
                  >
                    This month
                  </span>
                </div>
                <p
                  className="
                    text-5xl
                    lg:text-6xl
                    text-primary
                  "
                >
                  {formatMinutes(thisMonthMinutes)}
                </p>
              </div>
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  <Flame size={18} />
                  <span
                    className="
                      uppercase
                      tracking-[0.22em]
                      text-xs
                    "
                  >
                    Current streak
                  </span>
                </div>
                <p
                  className="
                    text-5xl
                    lg:text-6xl
                    text-primary
                  "
                >
                  {currentStreak}{" "}
                  <span className="text-2xl">
                    {currentStreak === 1
                      ? "day"
                      : "days"}
                  </span>
                </p>
              </div>
            </div>
            {/* =================================================
                CALENDAR
            ================================================= */}
            <div
              className="
                border-t
                pt-10
              "
              style={{
                borderColor:
                  "color-mix(in srgb, var(--mood-main) 18%, transparent)",
              }}
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-5
                  mb-8
                "
              >
                <div>
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mb-2
                    "
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    <CalendarDays size={17} />
                    <span
                      className="
                        uppercase
                        tracking-[0.24em]
                        text-xs
                      "
                    >
                      Activity calendar
                    </span>
                  </div>
                  <h3 className="text-3xl text-primary">
                    {monthFormatter.format(
                      visibleMonth
                    )}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() =>
                      setVisibleMonth(
                        new Date(
                          visibleMonth.getFullYear(),
                          visibleMonth.getMonth() - 1,
                          1
                        )
                      )
                    }
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                    "
                    style={{
                      background:
                        currentTheme.crystal,
                      borderColor:
                        currentTheme.border,
                      color: isNight
                        ? "white"
                        : "var(--text-primary)",
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() =>
                      setVisibleMonth(
                        new Date(
                          visibleMonth.getFullYear(),
                          visibleMonth.getMonth() + 1,
                          1
                        )
                      )
                    }
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                    "
                    style={{
                      background:
                        currentTheme.crystal,
                      borderColor:
                        currentTheme.border,
                      color: isNight
                        ? "white"
                        : "var(--text-primary)",
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <div
                className="
                  grid
                  grid-cols-7
                  gap-2
                  sm:gap-3
                "
              >
                {[
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ].map((day) => (
                  <div
                    key={day}
                    className="
                      text-center
                      uppercase
                      tracking-[0.16em]
                      text-[10px]
                      sm:text-xs
                      text-secondary
                      pb-2
                    "
                  >
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="aspect-square"
                      />
                    )
                  }
                  const key = dateKey(day)
                  const dayMinutes =
                    minutesByDay[key] ?? 0
                  const intensity =
                    dayMinutes === 0
                      ? 0
                      : Math.min(
                          12 + dayMinutes / 3,
                          42
                        )
                  const active =
                    selectedDay === key
                  const today =
                    key === dateKey(new Date())
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setSelectedDay(
                          active ? null : key
                        )
                      }
                      className="
                        relative
                        aspect-square
                        rounded-[18px]
                        sm:rounded-[22px]
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-1
                        border
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                      "
                      style={{
                        background:
                          dayMinutes > 0
                            ? `color-mix(in srgb, var(--mood-main) ${intensity}%, transparent)`
                            : currentTheme.crystal,
                        borderColor: active
                          ? "var(--mood-main)"
                          : today
                            ? "color-mix(in srgb, var(--mood-main) 45%, transparent)"
                            : currentTheme.border,
                        color: isNight
                          ? "rgba(255,255,255,.86)"
                          : "var(--text-primary)",
                      }}
                    >
                      <span
                        className="
                          text-sm
                          sm:text-base
                        "
                      >
                        {day.getDate()}
                      </span>
                      {dayMinutes > 0 && (
                        <span
                          className="
                            text-[9px]
                            sm:text-[10px]
                            font-medium
                          "
                          style={{
                            color:
                              "var(--mood-main)",
                          }}
                        >
                          {formatMinutes(dayMinutes)}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {/* SELECTED DAY */}
              {selectedDay && (
                <div
                  className="
                    mt-7
                    pt-7
                    border-t
                  "
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--mood-main) 15%, transparent)",
                  }}
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-5
                      mb-5
                    "
                  >
                    <div>
                      <p
                        className="
                          uppercase
                          tracking-[0.22em]
                          text-[10px]
                          mb-2
                        "
                        style={{
                          color:
                            "var(--mood-main)",
                        }}
                      >
                        Selected day
                      </p>
                      <h4 className="text-2xl text-primary">
                        {shortDateFormatter.format(
                          new Date(
                            `${selectedDay}T12:00:00`
                          )
                        )}
                      </h4>
                    </div>
                    <p
                      className="
                        text-xl
                        text-primary
                      "
                    >
                      {formatMinutes(
                        selectedDayTotal
                      )}
                    </p>
                  </div>
                  {selectedDaySessions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDaySessions.map(
                        (session) => (
                          <div
                            key={session.id}
                            className="
                              flex
                              items-center
                              justify-between
                              gap-5
                              py-3
                              border-b
                            "
                            style={{
                              borderColor:
                                "color-mix(in srgb, var(--mood-main) 10%, transparent)",
                            }}
                          >
                            <span className="text-primary">
                              {session.subjectName}
                            </span>
                            <span className="text-secondary">
                              {formatMinutes(
                                session.duration
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-secondary">
                      No deep work recorded on this day.
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
          {/* =================================================
              TIME BY SUBJECT
          ================================================= */}
          <section>
            <div className="mb-10">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                <Sprout size={17} />
                <span
                  className="
                    uppercase
                    tracking-[0.26em]
                    text-xs
                  "
                >
                  Your focus landscape
                </span>
              </div>
              <h2 className="text-5xl text-primary">
                Time by subject
              </h2>
            </div>
            {subjectStats.length > 0 ? (
              <div
                className="
                  max-w-4xl
                  space-y-8
                "
              >
                {subjectStats.map((subject) => {
                  const width =
                    maxSubjectMinutes === 0
                      ? 0
                      : (subject.minutes /
                          maxSubjectMinutes) *
                        100
                  return (
                    <div key={subject.name}>
                      <div
                        className="
                          flex
                          items-end
                          justify-between
                          gap-5
                          mb-3
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >
                          <span
                            className="
                              w-3
                              h-3
                              rounded-full
                            "
                            style={{
                              background:
                                subject.color,
                            }}
                          />
                          <h3 className="text-xl text-primary">
                            {subject.name}
                          </h3>
                        </div>
                        <span className="text-secondary">
                          {formatMinutes(
                            subject.minutes
                          )}
                        </span>
                      </div>
                      <div
                        className="
                          h-[8px]
                          rounded-full
                          overflow-hidden
                        "
                        style={{
                          background:
                            "color-mix(in srgb, var(--mood-main) 8%, transparent)",
                        }}
                      >
                        <div
                          className="
                            h-full
                            rounded-full
                          "
                          style={{
                            width: `${width}%`,
                            background:
                              subject.color,
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div
                className="
                  max-w-3xl
                  py-10
                  border-t
                "
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--mood-main) 15%, transparent)",
                }}
              >
                <p
                  className="
                    text-secondary
                    leading-relaxed
                  "
                >
                  Complete your first focus session
                  and your time will begin to appear
                  here.
                </p>
              </div>
            )}
          </section>
        </div>
        {/* =================================================
            ADD SUBJECT MODAL
        ================================================= */}
        {showAddSubject && (
          <div
            className="
              fixed
              inset-0
              z-[100]
              bg-black/20
              backdrop-blur-md
              flex
              items-center
              justify-center
              p-5
            "
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget
              ) {
                setShowAddSubject(false)
              }
            }}
          >
            <div
              className="
                relative
                w-full
                max-w-lg
                rounded-[36px]
                border
                backdrop-blur-[50px]
                p-7
                sm:p-9
              "
              style={{
                background: isNight
                  ? "rgba(22,29,44,.88)"
                  : "rgba(250,248,243,.88)",
                borderColor:
                  currentTheme.border,
                boxShadow:
                  "0 40px 120px rgba(0,0,0,.18)",
              }}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() =>
                  setShowAddSubject(false)
                }
                className="
                  absolute
                  top-5
                  right-5
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                "
                style={{
                  background:
                    currentTheme.crystal,
                  color: isNight
                    ? "white"
                    : "var(--text-primary)",
                }}
              >
                <X size={18} />
              </button>
              <p
                className="
                  uppercase
                  tracking-[0.26em]
                  text-xs
                  mb-3
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                New focus space
              </p>
              <h2
                className="
                  text-4xl
                  text-primary
                  mb-3
                "
              >
                Add subject or project
              </h2>
              <p
                className="
                  text-secondary
                  leading-relaxed
                  mb-8
                "
              >
                Your completed focus time will be
                connected to this subject.
              </p>
              <label
                className="
                  block
                  text-sm
                  text-secondary
                  mb-2
                "
              >
                Name
              </label>
              <input
                type="text"
                value={newSubjectName}
                onChange={(event) =>
                  setNewSubjectName(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addSubject()
                  }
                }}
                placeholder="Biology, Thesis, Portfolio..."
                autoFocus
                className="
                  w-full
                  rounded-[20px]
                  border
                  px-5
                  py-4
                  outline-none
                  mb-7
                  bg-transparent
                "
                style={{
                  borderColor:
                    currentTheme.border,
                  color: isNight
                    ? "white"
                    : "var(--text-primary)",
                }}
              />
              <p
                className="
                  text-sm
                  text-secondary
                  mb-3
                "
              >
                Color
              </p>
              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  mb-9
                "
              >
                {subjectColors.map((color) => {
                  const active =
                    newSubjectColor === color
                  return (
                    <button
                      key={color}
                      type="button"
                      aria-label={`Select ${color}`}
                      onClick={() =>
                        setNewSubjectColor(color)
                      }
                      className="
                        w-10
                        h-10
                        rounded-full
                        flex
                        items-center
                        justify-center
                        cursor-pointer
                        transition-transform
                        hover:scale-105
                      "
                      style={{
                        background: color,
                        boxShadow: active
                          ? `0 0 0 4px ${
                              isNight
                                ? "#161d2c"
                                : "#faf8f3"
                            }, 0 0 0 6px ${color}`
                          : "none",
                      }}
                    >
                      {active && (
                        <Check
                          size={16}
                          color="white"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={addSubject}
                disabled={
                  !newSubjectName.trim()
                }
                className="
                  w-full
                  px-6
                  py-4
                  rounded-full
                  text-white
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:scale-[1.01]
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
                style={{
                  background:
                    "var(--mood-main)",
                }}
              >
                Add subject
              </button>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  )
}