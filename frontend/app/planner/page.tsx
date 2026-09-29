"use client"
import {
  useEffect,
  useMemo,
  useState,
  type FormEventHandler,
} from "react"
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react"
import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"
import type { MoodId } from "@/components/mood/moodData"
import AppShell from "@/components/layout/AppShell"
import type { PlannerTask } from "@/components/data/types"
import {
  getPlannerTasks,
  savePlannerTasks,
  getPlannerIntention,
  savePlannerIntention
} from "@/components/data/studyData"
type PlannerMoodContent = {
  eyebrow: string
  title: string
  description: string
  intentionPlaceholder: string
  defaultIntention: string
}
const plannerContent = {
  calm: {
    eyebrow: "Gentle planning",
    title: "Calm Planner",
    description:
      "Give your month enough structure to feel clear without making it feel crowded.",
    intentionPlaceholder:
      "What would you like this month to feel like?",
    defaultIntention:
      "Move steadily without rushing.",
  },
  focus: {
    eyebrow: "Intentional planning",
    title: "Focus Planner",
    description:
      "Turn your priorities into a clear monthly plan and protect time for what matters most.",
    intentionPlaceholder:
      "What is the most important direction for this month?",
    defaultIntention:
      "Protect time for meaningful work.",
  },
  reflect: {
    eyebrow: "Thoughtful planning",
    title: "Reflect Planner",
    description:
      "Plan with enough space for ideas, reflection and work that cannot be rushed.",
    intentionPlaceholder:
      "What would you like to explore or develop this month?",
    defaultIntention:
      "Make space for thoughtful progress.",
  },
  restore: {
    eyebrow: "Supportive planning",
    title: "Restore Planner",
    description:
      "Plan around your available energy and make recovery part of the month.",
    intentionPlaceholder:
      "What would make this month feel more sustainable?",
    defaultIntention:
      "Do what matters and leave room to recover.",
  },
} as const satisfies Record<MoodId, PlannerMoodContent>
const themeEffects = {
  morning: {
    glass:
      "linear-gradient(135deg, rgba(255,255,255,0.58), rgba(255,255,255,0.18))",
    inner:
      "linear-gradient(145deg, rgba(255,255,255,0.40), rgba(255,255,255,0.12))",
    border: "rgba(255,255,255,0.62)",
    separator: "rgba(100,90,75,0.09)",
    glow: "rgba(255,221,171,0.30)",
  },
  sunset: {
    glass:
      "linear-gradient(135deg, rgba(255,247,242,0.52), rgba(255,220,215,0.14))",
    inner:
      "linear-gradient(145deg, rgba(255,247,242,0.36), rgba(255,226,220,0.10))",
    border: "rgba(255,255,255,0.46)",
    separator: "rgba(120,85,80,0.10)",
    glow: "rgba(220,145,125,0.28)",
  },
  night: {
    glass:
      "linear-gradient(135deg, rgba(43,52,72,0.62), rgba(20,26,40,0.32))",
    inner:
      "linear-gradient(145deg, rgba(58,69,94,0.30), rgba(16,22,35,0.18))",
    border: "rgba(255,255,255,0.13)",
    separator: "rgba(255,255,255,0.08)",
    glow: "rgba(105,126,190,0.30)",
  },
} as const
const quickColors = [
  "#9DB88C",
  "#F0A9B8",
  "#C6A7E2",
  "#91B8E5",
  "#F0B77C",
  "#E8D28B",
]
const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
]
function dateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
function sameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function buildCalendarDays(month: Date) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const firstDay = new Date(year, monthIndex, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const gridStart = new Date(
    year,
    monthIndex,
    1 - startOffset
  )
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}
function sortTasksByTime(tasks: PlannerTask[]) {
  return [...tasks].sort((a, b) => {
    if (!a.time && !b.time) {
      return a.createdAt.localeCompare(b.createdAt)
    }
    if (!a.time) return 1
    if (!b.time) return -1
    return a.time.localeCompare(b.time)
  })
}
export default function PlannerPage() {
  const { mood } = useMood()
  const { theme } = useTheme()
  const current = plannerContent[mood]
  const safeTheme =
    theme === "night"
      ? "night"
      : theme === "sunset"
        ? "sunset"
        : "morning"
  const currentTheme = themeEffects[safeTheme]
  const isNight = safeTheme === "night"
  const today = useMemo(() => new Date(), [])
  const [visibleMonth, setVisibleMonth] = useState(
    () =>
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
  )
  const [selectedDate, setSelectedDate] =
    useState<Date>(today)
  const [tasks, setTasks] = useState<PlannerTask[]>([])
  const [newTask, setNewTask] = useState("")
  const [newTime, setNewTime] = useState("")
  const [newColor, setNewColor] = useState("#9DB88C")
  const [editingTaskId, setEditingTaskId] =
    useState<string | null>(null)
  const [intention, setIntention] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const textPrimary = isNight
    ? "rgba(255,255,255,0.95)"
    : "var(--text-primary)"
  const textSecondary = isNight
    ? "rgba(255,255,255,0.58)"
    : "var(--text-secondary)"
  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth]
  )
  const monthLabel = visibleMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  )
  const selectedDateLabel =
    selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  const selectedKey = dateKey(selectedDate)
  const selectedTasks = sortTasksByTime(
    tasks.filter((task) => task.date === selectedKey)
  )
  const visibleMonthTasks = tasks.filter((task) => {
    const taskDate = new Date(`${task.date}T12:00:00`)
    return (
      taskDate.getFullYear() ===
        visibleMonth.getFullYear() &&
      taskDate.getMonth() === visibleMonth.getMonth()
    )
  })
  const completedMonthTasks =
    visibleMonthTasks.filter(
      (task) => task.completed
    ).length
  const monthProgress =
    visibleMonthTasks.length === 0
      ? 0
      : Math.round(
          (completedMonthTasks /
            visibleMonthTasks.length) *
            100
        )
  useEffect(() => {
    try {
      const storedTasks = getPlannerTasks()
      const storedIntention = getPlannerIntention()
      if (Array.isArray(storedTasks)) {
        const normalized: PlannerTask[] = storedTasks.map((task) => ({
          id: task.id ?? crypto.randomUUID(),
          text: task.text ?? "",
          date: task.date ?? dateKey(new Date()),
          time: task.time ?? "",
          color: task.color ?? "#9DB88C",
          completed: task.completed ?? false,
          createdAt: task.createdAt ?? new Date().toISOString(),
        }))
        setTasks(normalized)
      }
      if (storedIntention) {
        setIntention(storedIntention)
      } else {
        setIntention(current.defaultIntention)
      }
    } catch {
      console.error("Could not load planner data.")
      setIntention(current.defaultIntention)
    }
    setIsLoaded(true)
  }, [])
  const saveTasks = (updatedTasks: PlannerTask[]) => {
    setTasks(updatedTasks)
    savePlannerTasks(updatedTasks)
  }
  const resetTaskForm = () => {
    setNewTask("")
    setNewTime("")
    setNewColor("#9DB88C")
    setEditingTaskId(null)
  }
  const addOrUpdateTask: FormEventHandler<
    HTMLFormElement
  > = (event) => {
    event.preventDefault()
    const cleanTask = newTask.trim()
    if (!cleanTask) return
    /*
      EDIT
    */
    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              text: cleanTask,
              time: newTime,
              color: newColor,
            }
          : task
      )
      saveTasks(updatedTasks)
      resetTaskForm()
      return
    }
    /*
      NEW TASK
    */
    const task: PlannerTask = {
      id: crypto.randomUUID(),
      text: cleanTask,
      date: selectedKey,
      time: newTime,
      color: newColor,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    saveTasks([...tasks, task])
    resetTaskForm()
  }
  const startEditingTask = (task: PlannerTask) => {
    setEditingTaskId(task.id)
    setNewTask(task.text)
    setNewTime(task.time)
    setNewColor(task.color)
  }
  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    )
    saveTasks(updatedTasks)
  }
  const deleteTask = (id: string) => {
    saveTasks(
      tasks.filter((task) => task.id !== id)
    )
    if (editingTaskId === id) {
      resetTaskForm()
    }
  }
  const updateIntention = (value: string) => {
    setIntention(value)
    savePlannerIntention(value)
  }
  const previousMonth = () => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
          1
        )
    )
  }
  const nextMonth = () => {
    setVisibleMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          1
        )
    )
  }
  const goToToday = () => {
    const now = new Date()
    setVisibleMonth(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    )
    setSelectedDate(now)
    resetTaskForm()
  }
  const selectCalendarDate = (date: Date) => {
    setSelectedDate(date)
    resetTaskForm()
    if (
      date.getMonth() !== visibleMonth.getMonth() ||
      date.getFullYear() !== visibleMonth.getFullYear()
    ) {
      setVisibleMonth(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        )
      )
    }
  }
  return (
    <AppShell>
      <main
        className="
          app-container
          section-spacing
          pb-24
          relative
        "
      >
        {/* AMBIENT LIGHT */}
        <div
          className="
            fixed
            top-[8%]
            right-[4%]
            w-[560px]
            h-[560px]
            rounded-full
            blur-[150px]
            opacity-55
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: currentTheme.glow,
          }}
        />
        <div
          className="
            fixed
            bottom-[4%]
            left-[12%]
            w-[420px]
            h-[420px]
            rounded-full
            blur-[130px]
            opacity-30
            pointer-events-none
          "
          style={{
            background: "var(--mood-glow)",
          }}
        />
        <div className="relative z-10">
          {/* HEADER */}
          <header className="mb-12">
            <div
              className="
                w-12
                h-12
                rounded-full
                flex
                items-center
                justify-center
                mb-6
                border
                backdrop-blur-xl
              "
              style={{
                background:
                  "color-mix(in srgb, var(--mood-main) 10%, transparent)",
                borderColor: currentTheme.border,
                color: "var(--mood-main)",
              }}
            >
              <CalendarDays size={21} />
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
            <h1 className="text-6xl text-primary mb-4">
              {current.title}
            </h1>
            <p
              className="
                text-lg
                text-secondary
                max-w-2xl
                leading-relaxed
              "
            >
              {current.description}
            </p>
          </header>
          {/* MONTHLY CALENDAR */}
          <section
            className="
              relative
              rounded-[46px]
              border
              backdrop-blur-[40px]
              overflow-hidden
              mb-8
            "
            style={{
              background: currentTheme.glass,
              borderColor: currentTheme.border,
              boxShadow: isNight
                ? `
                  0 30px 90px rgba(0,0,0,0.28),
                  inset 0 1px 0 rgba(255,255,255,0.12)
                `
                : `
                  0 30px 90px rgba(95,80,60,0.08),
                  inset 0 1px 0 rgba(255,255,255,0.80)
                `,
            }}
          >
            {/* CRYSTAL REFLECTION */}
            <div
              className="
                absolute
                -top-44
                left-[12%]
                w-[520px]
                h-[300px]
                rotate-[-12deg]
                blur-[70px]
                opacity-30
                pointer-events-none
              "
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
              }}
            />
            <div
              className="
                absolute
                -bottom-32
                right-[5%]
                w-[420px]
                h-[420px]
                rounded-full
                blur-[120px]
                opacity-25
                pointer-events-none
              "
              style={{
                background: "var(--mood-glow)",
              }}
            />
            <div className="relative z-10">
              {/* CALENDAR HEADER */}
              <div
                className="
                  px-7
                  lg:px-10
                  pt-8
                  pb-7
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-6
                "
              >
                <div>
                  <p
                    className="
                      uppercase
                      tracking-[0.28em]
                      text-xs
                      mb-3
                    "
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    Monthly plan
                  </p>
                  <h2
                    className="
                      text-4xl
                      lg:text-5xl
                      capitalize
                    "
                    style={{
                      color: textPrimary,
                    }}
                  >
                    {monthLabel}
                  </h2>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    flex-wrap
                  "
                >
                  <button
                    type="button"
                    onClick={previousMonth}
                    aria-label="Previous month"
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                    style={{
                      background: currentTheme.inner,
                      borderColor: currentTheme.border,
                      color: textPrimary,
                    }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={goToToday}
                    className="
                      h-11
                      px-5
                      rounded-full
                      border
                      backdrop-blur-xl
                      cursor-pointer
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                    "
                    style={{
                      background: currentTheme.inner,
                      borderColor: currentTheme.border,
                      color: textPrimary,
                    }}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    aria-label="Next month"
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      backdrop-blur-xl
                      flex
                      items-center
                      justify-center
                      cursor-pointer
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                    style={{
                      background: currentTheme.inner,
                      borderColor: currentTheme.border,
                      color: textPrimary,
                    }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              {/* WEEK DAYS */}
              <div
                className="
                  grid
                  grid-cols-7
                  border-t
                  border-b
                "
                style={{
                  borderColor: currentTheme.separator,
                }}
              >
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="
                      py-4
                      text-center
                      uppercase
                      tracking-[0.22em]
                      text-[10px]
                      sm:text-xs
                    "
                    style={{
                      color: textSecondary,
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
              {/* CALENDAR DAYS */}
              <div className="grid grid-cols-7">
                {calendarDays.map((date, index) => {
                  const key = dateKey(date)
                  const dayTasks = sortTasksByTime(
                    tasks.filter(
                      (task) => task.date === key
                    )
                  )
                  const isCurrentMonth =
                    date.getMonth() ===
                      visibleMonth.getMonth() &&
                    date.getFullYear() ===
                      visibleMonth.getFullYear()
                  const isToday = sameDate(date, today)
                  const isSelected = sameDate(
                    date,
                    selectedDate
                  )
                  const completed =
                    dayTasks.filter(
                      (task) => task.completed
                    ).length
                  return (
                    <button
                      type="button"
                      key={key}
                      onClick={() =>
                        selectCalendarDate(date)
                      }
                      className="
                        relative
                        text-left
                        min-h-[130px]
                        lg:min-h-[155px]
                        p-3
                        sm:p-4
                        lg:p-5
                        cursor-pointer
                        transition-all
                        duration-300
                        overflow-hidden
                      "
                      style={{
                        borderRight:
                          (index + 1) % 7 === 0
                            ? "none"
                            : `1px solid ${currentTheme.separator}`,
                        borderBottom:
                          index >= 35
                            ? "none"
                            : `1px solid ${currentTheme.separator}`,
                        background: isSelected
                          ? `linear-gradient(
                              145deg,
                              color-mix(in srgb, var(--mood-main) 18%, transparent),
                              rgba(255,255,255,0.04)
                            )`
                          : "transparent",
                        opacity: isCurrentMonth
                          ? 1
                          : 0.32,
                      }}
                    >
                      {isSelected && (
                        <div
                          className="
                            absolute
                            inset-2
                            rounded-[22px]
                            border
                            pointer-events-none
                          "
                          style={{
                            borderColor:
                              "color-mix(in srgb, var(--mood-main) 28%, rgba(255,255,255,0.25))",
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,0.35)",
                          }}
                        />
                      )}
                      <div
                        className="
                          relative
                          z-10
                          flex
                          items-start
                          justify-between
                          gap-2
                          mb-3
                        "
                      >
                        <span
                          className="
                            w-8
                            h-8
                            rounded-full
                            flex
                            items-center
                            justify-center
                            text-sm
                          "
                          style={{
                            background: isToday
                              ? "var(--mood-main)"
                              : "transparent",
                            color: isToday
                              ? "white"
                              : textPrimary,
                          }}
                        >
                          {date.getDate()}
                        </span>
                        {dayTasks.length > 0 && (
                          <span
                            className="text-[10px]"
                            style={{
                              color: textSecondary,
                            }}
                          >
                            {completed}/{dayTasks.length}
                          </span>
                        )}
                      </div>
                      {/* DESKTOP TASK PREVIEW */}
                      <div
                        className="
                          relative
                          z-10
                          space-y-2
                          hidden
                          sm:block
                        "
                      >
                        {dayTasks
                          .slice(0, 3)
                          .map((task) => (
                            <div
                              key={task.id}
                              className="
                                flex
                                items-center
                                gap-1.5
                                min-w-0
                              "
                            >
                              <span
                                className="
                                  w-2
                                  h-2
                                  rounded-full
                                  shrink-0
                                "
                                style={{
                                  background: task.color,
                                  opacity: task.completed
                                    ? 0.45
                                    : 1,
                                }}
                              />
                              {task.time && (
                                <span
                                  className="
                                    text-[10px]
                                    shrink-0
                                    tabular-nums
                                  "
                                  style={{
                                    color: textSecondary,
                                  }}
                                >
                                  {task.time}
                                </span>
                              )}
                              <span
                                className="
                                  text-xs
                                  truncate
                                "
                                style={{
                                  color: task.completed
                                    ? textSecondary
                                    : textPrimary,
                                  textDecoration:
                                    task.completed
                                      ? "line-through"
                                      : "none",
                                  opacity: task.completed
                                    ? 0.6
                                    : 0.9,
                                }}
                              >
                                {task.text}
                              </span>
                            </div>
                          ))}
                        {dayTasks.length > 3 && (
                          <p
                            className="
                              text-[10px]
                              pl-3.5
                            "
                            style={{
                              color: textSecondary,
                            }}
                          >
                            +{dayTasks.length - 3} more
                          </p>
                        )}
                      </div>
                      {/* MOBILE COLOR DOTS */}
                      {dayTasks.length > 0 && (
                        <div
                          className="
                            sm:hidden
                            absolute
                            bottom-3
                            left-1/2
                            -translate-x-1/2
                            flex
                            gap-1
                          "
                        >
                          {dayTasks
                            .slice(0, 4)
                            .map((task) => (
                              <span
                                key={task.id}
                                className="
                                  w-1.5
                                  h-1.5
                                  rounded-full
                                "
                                style={{
                                  background: task.color,
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
          {/* SELECTED DAY + PROGRESS */}
          <div
            className="
              grid
              xl:grid-cols-[1.45fr_0.55fr]
              gap-8
              items-start
              mb-8
            "
          >
            {/* DAILY PLAN */}
            <section
              className="
                relative
                rounded-[42px]
                border
                backdrop-blur-[36px]
                overflow-hidden
                p-7
                lg:p-9
              "
              style={{
                background: currentTheme.glass,
                borderColor: currentTheme.border,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.30)",
              }}
            >
              <div
                className="
                  absolute
                  -top-28
                  -right-24
                  w-72
                  h-72
                  rounded-full
                  blur-[90px]
                  opacity-25
                  pointer-events-none
                "
                style={{
                  background: "var(--mood-glow)",
                }}
              />
              <div className="relative z-10">
                {/* DAY HEADER */}
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    gap-4
                    mb-7
                  "
                >
                  <div>
                    <p
                      className="
                        uppercase
                        tracking-[0.28em]
                        text-xs
                        mb-3
                      "
                      style={{
                        color: "var(--mood-main)",
                      }}
                    >
                      Daily plan
                    </p>
                    <h2
                      className="
                        text-3xl
                        lg:text-4xl
                      "
                      style={{
                        color: textPrimary,
                      }}
                    >
                      {selectedDateLabel}
                    </h2>
                  </div>
                  <span
                    className="text-sm"
                    style={{
                      color: textSecondary,
                    }}
                  >
                    {
                      selectedTasks.filter(
                        (task) => task.completed
                      ).length
                    }{" "}
                    of {selectedTasks.length} complete
                  </span>
                </div>
                {/* TASK FORM */}
                <form
                  onSubmit={addOrUpdateTask}
                  className="
                    rounded-[30px]
                    border
                    p-4
                    sm:p-5
                    mb-7
                    backdrop-blur-xl
                  "
                  style={{
                    background: currentTheme.inner,
                    borderColor: currentTheme.border,
                  }}
                >
                  {/* NAME */}
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      min-h-[54px]
                      rounded-[22px]
                      px-4
                      mb-4
                      border
                    "
                    style={{
                      background:
                        isNight
                          ? "rgba(255,255,255,0.035)"
                          : "rgba(255,255,255,0.20)",
                      borderColor:
                        currentTheme.separator,
                    }}
                  >
                    <Plus
                      size={18}
                      style={{
                        color: newColor,
                      }}
                    />
                    <input
                      type="text"
                      value={newTask}
                      onChange={(event) =>
                        setNewTask(event.target.value)
                      }
                      placeholder="Add a plan for this day..."
                      className="
                        flex-1
                        min-w-0
                        bg-transparent
                        outline-none
                        border-0
                      "
                      style={{
                        color: textPrimary,
                        caretColor: newColor,
                      }}
                    />
                    {newTask && (
                      <button
                        type="button"
                        onClick={() => setNewTask("")}
                        aria-label="Clear task"
                        className="
                          w-8
                          h-8
                          rounded-full
                          flex
                          items-center
                          justify-center
                          cursor-pointer
                        "
                        style={{
                          color: textSecondary,
                        }}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>
                  {/* TIME + COLOR */}
                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-5
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        gap-5
                      "
                    >
                      {/* TIME */}
                      <label
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <span
                          className="
                            flex
                            items-center
                            gap-2
                            text-sm
                          "
                          style={{
                            color: textSecondary,
                          }}
                        >
                          <Clock3 size={15} />
                          Time
                        </span>
                        <input
                          type="time"
                          value={newTime}
                          onChange={(event) =>
                            setNewTime(
                              event.target.value
                            )
                          }
                          className="
                            rounded-full
                            border
                            px-4
                            py-2
                            bg-transparent
                            outline-none
                            cursor-pointer
                          "
                          style={{
                            borderColor:
                              currentTheme.border,
                            color: textPrimary,
                          }}
                        />
                      </label>
                      {/* COLORS */}
                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          flex-wrap
                        "
                      >
                        <span
                          className="text-sm"
                          style={{
                            color: textSecondary,
                          }}
                        >
                          Color
                        </span>
                        <div className="flex gap-2">
                          {quickColors.map((color) => {
                            const active =
                              newColor.toLowerCase() ===
                              color.toLowerCase()
                            return (
                              <button
                                key={color}
                                type="button"
                                onClick={() =>
                                  setNewColor(color)
                                }
                                aria-label={`Select ${color}`}
                                className="
                                  w-7
                                  h-7
                                  rounded-full
                                  cursor-pointer
                                  transition-all
                                  duration-200
                                  hover:scale-110
                                "
                                style={{
                                  background: color,
                                  boxShadow: active
                                    ? `0 0 0 3px ${
                                        isNight
                                          ? "#1b2230"
                                          : "#ffffff"
                                      }, 0 0 0 5px ${color}`
                                    : "none",
                                }}
                              />
                            )
                          })}
                        </div>
                        {/* FULL COLOR SPECTRUM */}
                        <label
                          className="
                            relative
                            w-8
                            h-8
                            rounded-full
                            cursor-pointer
                            overflow-hidden
                            border
                            shrink-0
                          "
                          title="Choose any color"
                          style={{
                            borderColor:
                              currentTheme.border,
                            background: `
                              conic-gradient(
                                #ff5f6d,
                                #ffc371,
                                #f9f871,
                                #7bd88f,
                                #6bc5ff,
                                #9b7bff,
                                #ef7ac8,
                                #ff5f6d
                              )
                            `,
                          }}
                        >
                          <input
                            type="color"
                            value={newColor}
                            onChange={(event) =>
                              setNewColor(
                                event.target.value
                              )
                            }
                            className="
                              absolute
                              inset-0
                              w-full
                              h-full
                              opacity-0
                              cursor-pointer
                            "
                          />
                        </label>
                      </div>
                    </div>
                    {/* FORM BUTTONS */}
                    <div className="flex gap-2">
                      {editingTaskId && (
                        <button
                          type="button"
                          onClick={resetTaskForm}
                          className="
                            min-h-[48px]
                            px-5
                            rounded-full
                            border
                            cursor-pointer
                            transition-all
                            hover:scale-[1.02]
                          "
                          style={{
                            background:
                              currentTheme.inner,
                            borderColor:
                              currentTheme.border,
                            color: textPrimary,
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={!newTask.trim()}
                        className="
                          min-h-[48px]
                          px-6
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
                          disabled:opacity-35
                          disabled:cursor-not-allowed
                        "
                        style={{
                          background: newColor,
                        }}
                      >
                        {editingTaskId ? (
                          <>
                            <Check size={16} />
                            Save changes
                          </>
                        ) : (
                          <>
                            <Plus size={16} />
                            Add plan
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                {/* TASKS */}
                {!isLoaded ? null : selectedTasks.length ===
                  0 ? (
                  <div
                    className="
                      min-h-[180px]
                      rounded-[28px]
                      border
                      flex
                      flex-col
                      items-center
                      justify-center
                      text-center
                      px-6
                    "
                    style={{
                      background: currentTheme.inner,
                      borderColor: currentTheme.border,
                    }}
                  >
                    <CalendarDays
                      size={22}
                      className="mb-4"
                      style={{
                        color: "var(--mood-main)",
                      }}
                    />
                    <h3
                      className="text-2xl mb-2"
                      style={{
                        color: textPrimary,
                      }}
                    >
                      This day is open
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        color: textSecondary,
                      }}
                    >
                      Add only what deserves space here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="
                          group
                          relative
                          min-h-[72px]
                          rounded-[24px]
                          border
                          px-5
                          py-4
                          flex
                          items-center
                          gap-4
                          backdrop-blur-xl
                          transition-all
                          duration-300
                          overflow-hidden
                        "
                        style={{
                          background: `
                            linear-gradient(
                              90deg,
                              ${task.color}18,
                              transparent 35%
                            ),
                            ${currentTheme.inner}
                          `,
                          borderColor:
                            editingTaskId === task.id
                              ? task.color
                              : currentTheme.border,
                        }}
                      >
                        {/* COLOR EDGE */}
                        <div
                          className="
                            absolute
                            left-0
                            top-[18%]
                            bottom-[18%]
                            w-[3px]
                            rounded-full
                          "
                          style={{
                            background: task.color,
                          }}
                        />
                        {/* CHECK */}
                        <button
                          type="button"
                          onClick={() =>
                            toggleTask(task.id)
                          }
                          className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            shrink-0
                            cursor-pointer
                            transition-all
                          "
                          style={{
                            background: task.completed
                              ? task.color
                              : `${task.color}18`,
                            color: task.completed
                              ? "white"
                              : task.color,
                          }}
                        >
                          {task.completed ? (
                            <Check size={16} />
                          ) : (
                            <Circle size={16} />
                          )}
                        </button>
                        {/* TIME */}
                        {task.time && (
                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                              shrink-0
                              text-sm
                              tabular-nums
                            "
                            style={{
                              color: task.completed
                                ? textSecondary
                                : task.color,
                            }}
                          >
                            <Clock3 size={14} />
                            {task.time}
                          </div>
                        )}
                        {/* NAME */}
                        <span
                          className="
                            flex-1
                            min-w-0
                            break-words
                          "
                          style={{
                            color: task.completed
                              ? textSecondary
                              : textPrimary,
                            textDecoration:
                              task.completed
                                ? "line-through"
                                : "none",
                            opacity: task.completed
                              ? 0.65
                              : 1,
                          }}
                        >
                          {task.text}
                        </span>
                        {/* EDIT */}
                        <button
                          type="button"
                          onClick={() =>
                            startEditingTask(task)
                          }
                          aria-label="Edit plan"
                          className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            opacity-60
                            lg:opacity-0
                            lg:group-hover:opacity-60
                            hover:!opacity-100
                            transition-all
                          "
                          style={{
                            color: textSecondary,
                          }}
                        >
                          <Pencil size={15} />
                        </button>
                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() =>
                            deleteTask(task.id)
                          }
                          aria-label="Delete plan"
                          className="
                            w-9
                            h-9
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            opacity-60
                            lg:opacity-0
                            lg:group-hover:opacity-60
                            hover:!opacity-100
                            transition-all
                          "
                          style={{
                            color: textSecondary,
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
            {/* MONTH PROGRESS */}
            <section
              className="
                relative
                rounded-[42px]
                border
                backdrop-blur-[36px]
                overflow-hidden
                p-8
              "
              style={{
                background: currentTheme.glass,
                borderColor: currentTheme.border,
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.30)",
              }}
            >
              <div
                className="
                  absolute
                  -bottom-20
                  -right-20
                  w-56
                  h-56
                  rounded-full
                  blur-[75px]
                  opacity-30
                  pointer-events-none
                "
                style={{
                  background: "var(--mood-glow)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="
                    w-11
                    h-11
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mb-7
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 13%, transparent)",
                    color: "var(--mood-main)",
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <p
                  className="
                    uppercase
                    tracking-[0.28em]
                    text-xs
                    mb-3
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  Monthly progress
                </p>
                <div
                  className="
                    flex
                    items-end
                    gap-2
                    mb-6
                  "
                >
                  <span
                    className="
                      text-6xl
                      leading-none
                    "
                    style={{
                      color: textPrimary,
                    }}
                  >
                    {monthProgress}
                  </span>
                  <span
                    className="
                      text-xl
                      mb-1
                    "
                    style={{
                      color: textSecondary,
                    }}
                  >
                    %
                  </span>
                </div>
                <div
                  className="
                    h-2
                    rounded-full
                    overflow-hidden
                    mb-5
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
                      duration-700
                    "
                    style={{
                      width: `${monthProgress}%`,
                      background: "var(--mood-main)",
                    }}
                  />
                </div>
                <p
                  className="
                    text-sm
                    leading-relaxed
                  "
                  style={{
                    color: textSecondary,
                  }}
                >
                  {completedMonthTasks} of{" "}
                  {visibleMonthTasks.length} plans completed
                  this month.
                </p>
                <div
                  className="
                    mt-8
                    pt-7
                    border-t
                  "
                  style={{
                    borderColor: currentTheme.separator,
                  }}
                >
                  <p
                    className="
                      text-sm
                      leading-relaxed
                    "
                    style={{
                      color: textSecondary,
                    }}
                  >
                    Every completed plan will later
                    contribute to your Planner plant in
                    the Mood Garden.
                  </p>
                </div>
              </div>
            </section>
          </div>
          {/* MONTHLY INTENTION */}
          <section
            className="
              relative
              rounded-[42px]
              border
              backdrop-blur-[36px]
              overflow-hidden
              p-8
              lg:p-10
            "
            style={{
              background: currentTheme.glass,
              borderColor: currentTheme.border,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.30)",
            }}
          >
            <div
              className="
                absolute
                -bottom-32
                right-[5%]
                w-[380px]
                h-[380px]
                rounded-full
                blur-[110px]
                opacity-25
                pointer-events-none
              "
              style={{
                background: "var(--mood-glow)",
              }}
            />
            <div className="relative z-10">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  uppercase
                  tracking-[0.28em]
                  text-xs
                  mb-4
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                <Sparkles size={15} />
                <span>Monthly intention</span>
              </div>
              <div
                className="
                  grid
                  lg:grid-cols-[0.7fr_1.3fr]
                  gap-8
                  lg:gap-12
                  items-start
                "
              >
                <div>
                  <h2
                    className="
                      text-4xl
                      mb-3
                    "
                    style={{
                      color: textPrimary,
                    }}
                  >
                    Give the month a direction
                  </h2>
                  <p
                    className="
                      leading-relaxed
                      max-w-lg
                    "
                    style={{
                      color: textSecondary,
                    }}
                  >
                    Not another task. Just a sentence
                    that reminds you how you want to
                    move through this month.
                  </p>
                </div>
                <div>
                  <textarea
                    value={intention}
                    onChange={(event) =>
                      updateIntention(
                        event.target.value
                      )
                    }
                    placeholder={
                      current.intentionPlaceholder
                    }
                    maxLength={180}
                    className="
                      w-full
                      min-h-[150px]
                      rounded-[30px]
                      border
                      p-6
                      bg-transparent
                      resize-none
                      outline-none
                      text-xl
                      leading-relaxed
                      backdrop-blur-xl
                    "
                    style={{
                      background: currentTheme.inner,
                      borderColor: currentTheme.border,
                      color: textPrimary,
                      caretColor: "var(--mood-main)",
                    }}
                  />
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      mt-4
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                      "
                      style={{
                        color: textSecondary,
                      }}
                    >
                      <Sparkles
                        size={14}
                        style={{
                          color: "var(--mood-main)",
                        }}
                      />
                      <span>Saved automatically</span>
                    </div>
                    <span
                      className="text-xs"
                      style={{
                        color: textSecondary,
                      }}
                    >
                      {intention.length}/180
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  )
}
