"use client"

import {
  useEffect,
  useState,
  type CSSProperties,
} from "react"
import {
  BookOpenText,
  Feather,
  Heart,
  Target,
  Brain,
  ListChecks,
  Lightbulb,
  Sparkles,
  MoonStar,
  BatteryCharging,
  Cloud,
  Flower2,
  Save,
  History,
  Trash2,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react"
import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"
import type { MoodId } from "@/components/mood/moodData"
import AppShell from "@/components/layout/AppShell"
import type { JournalEntry } from "@/components/data/types"
import {
  getJournalEntries,
  saveJournalEntries,
} from "@/components/data/studyData"

type Prompt = {
  title: string
  question: string
  icon: LucideIcon
}

type JournalMoodContent = {
  eyebrow: string
  title: string
  description: string
  noteTitle: string
  placeholder: string
  image: string
  imageLabel: string
  prompts: readonly Prompt[]
}

const journalContent = {
  calm: {
    eyebrow: "Gentle reflection",
    title: "Calm Journal",
    description:
      "Slow down, soften the noise and give your thoughts a little more space.",
    noteTitle: "Quiet Notes",
    placeholder:
      "Write without rushing. What is present in your mind right now?",
    image: "/images/moods/calm/journal.jpg",
    imageLabel: "A quiet place to slow down",
    prompts: [
      {
        title: "Gratitude",
        question: "What feels quietly good in your life today?",
        icon: Heart,
      },
      {
        title: "Awareness",
        question: "What feeling would you like to make space for?",
        icon: Cloud,
      },
      {
        title: "Intention",
        question: "What would make today feel gentle and complete?",
        icon: Flower2,
      },
    ],
  },
  focus: {
    eyebrow: "Clear direction",
    title: "Focus Journal",
    description:
      "Organize your thoughts, reduce mental noise and decide what deserves your attention.",
    noteTitle: "Focus Notes",
    placeholder:
      "What needs your attention? Write down the thoughts you want to organize...",
    image: "/images/moods/focus/focus-journal.jpg",
    imageLabel: "Clear your mind before you begin",
    prompts: [
      {
        title: "Priority",
        question: "What is the one task that matters most right now?",
        icon: Target,
      },
      {
        title: "Clarity",
        question: "What is currently distracting or occupying your mind?",
        icon: Brain,
      },
      {
        title: "Next Step",
        question: "What is the smallest meaningful action you can take?",
        icon: ListChecks,
      },
    ],
  },
  reflect: {
    eyebrow: "Inner reflection",
    title: "Reflect Journal",
    description:
      "Notice patterns, explore emotions and give unfinished thoughts somewhere to unfold.",
    noteTitle: "Reflection Pages",
    placeholder:
      "Let the thought unfold. What have you been carrying with you lately?",
    image: "/images/moods/reflect/reflect-journal.jpg",
    imageLabel: "Give your thoughts room to unfold",
    prompts: [
      {
        title: "Notice",
        question: "What emotion has been returning to you recently?",
        icon: Feather,
      },
      {
        title: "Meaning",
        question: "What has this season of your life been teaching you?",
        icon: Lightbulb,
      },
      {
        title: "Growth",
        question: "What part of yourself are you beginning to understand?",
        icon: Sparkles,
      },
    ],
  },
  restore: {
    eyebrow: "Soft recovery",
    title: "Restore Journal",
    description:
      "Release pressure, acknowledge your energy and make room for genuine rest.",
    noteTitle: "Rest Notes",
    placeholder:
      "You do not need to solve anything here. Write what you would like to release...",
    image: "/images/moods/restore/restore-journal.jpg",
    imageLabel: "Nothing needs to be solved right now",
    prompts: [
      {
        title: "Release",
        question: "What can you allow yourself to put down for today?",
        icon: MoonStar,
      },
      {
        title: "Energy",
        question: "What has been taking more energy than it gives back?",
        icon: BatteryCharging,
      },
      {
        title: "Care",
        question: "What would feeling cared for look like tonight?",
        icon: Heart,
      },
    ],
  },
} as const satisfies Record<MoodId, JournalMoodContent>

const themeEffects = {
  morning: {
    imageFilter:
      "brightness(1.08) saturate(0.92) contrast(0.96)",
    overlay: `
      linear-gradient(
        120deg,
        rgba(255,246,226,0.16) 0%,
        rgba(255,255,255,0.02) 52%,
        rgba(255,235,205,0.08) 100%
      )
    `,
    pageGlow: "rgba(255,230,190,0.20)",
    surface: `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.52) 0%,
        rgba(255,255,255,0.25) 48%,
        rgba(255,248,238,0.34) 100%
      )
    `,
    softSurface: `
      linear-gradient(
        135deg,
        rgba(255,255,255,0.38),
        rgba(255,255,255,0.16)
      )
    `,
    border: "rgba(255,255,255,0.34)",
    innerLight: "rgba(255,255,255,0.72)",
  },
  sunset: {
    imageFilter:
      "brightness(0.98) saturate(1.02) sepia(0.08)",
    overlay: `
      linear-gradient(
        120deg,
        rgba(173,100,76,0.18) 0%,
        rgba(216,155,120,0.10) 48%,
        rgba(105,73,92,0.12) 100%
      )
    `,
    pageGlow: "rgba(194,126,112,0.20)",
    surface: `
      linear-gradient(
        135deg,
        rgba(255,248,244,0.48),
        rgba(255,232,226,0.20),
        rgba(255,255,255,0.24)
      )
    `,
    softSurface: `
      linear-gradient(
        135deg,
        rgba(255,247,242,0.34),
        rgba(255,235,230,0.12)
      )
    `,
    border: "rgba(255,255,255,0.28)",
    innerLight: "rgba(255,255,255,0.60)",
  },
  night: {
    imageFilter:
      "brightness(0.62) saturate(0.76) contrast(1.08)",
    overlay: `
      linear-gradient(
        120deg,
        rgba(19,29,49,0.38) 0%,
        rgba(32,43,65,0.22) 50%,
        rgba(13,22,39,0.42) 100%
      )
    `,
    pageGlow: "rgba(78,96,135,0.22)",
    surface: `
      linear-gradient(
        135deg,
        rgba(37,45,63,0.48),
        rgba(19,25,39,0.28),
        rgba(48,55,76,0.22)
      )
    `,
    softSurface: `
      linear-gradient(
        135deg,
        rgba(40,48,66,0.30),
        rgba(18,24,38,0.18)
      )
    `,
    border: "rgba(255,255,255,0.10)",
    innerLight: "rgba(255,255,255,0.12)",
  },
} as const

const moodNames: Record<MoodId, string> = {
  calm: "Calm",
  focus: "Focus",
  reflect: "Reflect",
  restore: "Restore",
}

function formatEntryDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export default function JournalPage() {
  const { mood } = useMood()
  const { theme } = useTheme()
  const current = journalContent[mood]
  const safeTheme =
    theme === "morning" ||
    theme === "sunset" ||
    theme === "night"
      ? theme
      : "morning"
  const currentTheme = themeEffects[safeTheme]
  const isNight = safeTheme === "night"
  const [selectedPrompt, setSelectedPrompt] =
    useState<string | null>(null)
  const [journalText, setJournalText] = useState("")
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [saved, setSaved] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const storedEntries = getJournalEntries()
      if (Array.isArray(storedEntries)) {
        setEntries(storedEntries)
      }
    } catch {
      console.error("Could not load journal entries.")
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    setSelectedPrompt(null)
    setSaved(false)
  }, [mood])

  const saveEntry = () => {
    const cleanText = journalText.trim()
    if (!cleanText) return
    const newEntry: JournalEntry = {
      id: crypto.randomUUID(),
      text: cleanText,
      mood,
      prompt: selectedPrompt,
      createdAt: new Date().toISOString(),
    }
    const updatedEntries = [
      newEntry,
      ...entries,
    ]
    setEntries(updatedEntries)
    saveJournalEntries(updatedEntries)
    setJournalText("")
    setSelectedPrompt(null)
    setSaved(true)
    window.setTimeout(() => {
      setSaved(false)
    }, 2200)
  }

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(
      (entry) => entry.id !== id
    )
    setEntries(updatedEntries)
    saveJournalEntries(updatedEntries)
  }

  const openEntry = (entry: JournalEntry) => {
    setJournalText(entry.text)
    if (entry.mood === mood) {
      setSelectedPrompt(entry.prompt)
    } else {
      setSelectedPrompt(null)
    }
    setSaved(false)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }

  const crystalStyle: CSSProperties = {
    background: currentTheme.surface,
    border: `1px solid ${currentTheme.border}`,
    boxShadow: `
      inset 0 1px 0 ${currentTheme.innerLight},
      0 24px 70px rgba(0,0,0,${
        isNight ? "0.18" : "0.055"
      })
    `,
  }

  const softCrystalStyle: CSSProperties = {
    background: currentTheme.softSurface,
    border: `1px solid ${currentTheme.border}`,
    boxShadow: `
      inset 0 1px 0 ${currentTheme.innerLight},
      0 14px 40px rgba(0,0,0,${
        isNight ? "0.12" : "0.035"
      })
    `,
  }

  return (
    <AppShell>
      <main
        className="
          app-container
          section-spacing
          relative
          overflow-hidden
          pb-24
        "
      >
        <div
          className="
            fixed
            top-[10%]
            right-[5%]
            w-[520px]
            h-[520px]
            rounded-full
            blur-[150px]
            pointer-events-none
            opacity-60
            transition-all
            duration-700
          "
          style={{
            background: currentTheme.pageGlow,
          }}
        />
        <div
          className="
            fixed
            bottom-[4%]
            left-[14%]
            w-[420px]
            h-[420px]
            rounded-full
            blur-[150px]
            pointer-events-none
            opacity-30
          "
          style={{
            background: "var(--mood-glow)",
          }}
        />
        <div className="relative z-10">
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
                backdrop-blur-xl
              "
              style={{
                background:
                  "color-mix(in srgb, var(--mood-main) 13%, transparent)",
                color: "var(--mood-main)",
              }}
            >
              <BookOpenText size={21} />
            </div>
            <p
              className="
                uppercase
                tracking-[0.3em]
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
          <section
            className="
              relative
              min-h-[470px]
              rounded-[52px]
              overflow-hidden
              mb-14
            "
            style={{
              boxShadow:
                "0 30px 90px rgba(0,0,0,0.08)",
            }}
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
                transition-all
                duration-700
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
                from-black/40
                via-transparent
                to-transparent
              "
            />
            <div
              className="
                absolute
                left-7
                right-7
                bottom-7
                sm:right-auto
                sm:max-w-md
                rounded-[32px]
                px-7
                py-6
                backdrop-blur-3xl
              "
              style={{
                background: isNight
                  ? "rgba(18,24,37,0.42)"
                  : "rgba(255,255,255,0.36)",
                border:
                  "1px solid rgba(255,255,255,0.18)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.28)",
              }}
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                  text-xs
                  uppercase
                  tracking-[0.25em]
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.68)"
                    : "var(--mood-main)",
                }}
              >
                <Feather size={14} />
                <span>Journal atmosphere</span>
              </div>
              <p
                className="text-2xl leading-snug"
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.94)"
                    : "var(--text-primary)",
                }}
              >
                {current.imageLabel}
              </p>
            </div>
          </section>
          <div className="mb-7">
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
              A place to begin
            </p>
            <h2 className="text-4xl text-primary">
              Reflection Prompts
            </h2>
          </div>
          <section
            className="
              grid
              lg:grid-cols-3
              gap-5
              mb-14
            "
          >
            {current.prompts.map(
              ({ title, question, icon: Icon }) => {
                const isSelected =
                  selectedPrompt === question
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => {
                      setSelectedPrompt(question)
                      setSaved(false)
                    }}
                    className="
                      relative
                      min-h-[235px]
                      rounded-[44px]
                      p-8
                      text-left
                      overflow-hidden
                      backdrop-blur-3xl
                      transition-all
                      duration-500
                      cursor-pointer
                      group
                      hover:-translate-y-1
                    "
                    style={{
                      ...softCrystalStyle,
                      background: isSelected
                        ? `
                          linear-gradient(
                            135deg,
                            color-mix(
                              in srgb,
                              var(--mood-main) 16%,
                              transparent
                            ),
                            color-mix(
                              in srgb,
                              var(--mood-glow) 8%,
                              transparent
                            )
                          )
                        `
                        : currentTheme.softSurface,
                      border: isSelected
                        ? "1px solid color-mix(in srgb, var(--mood-main) 35%, transparent)"
                        : `1px solid ${currentTheme.border}`,
                      boxShadow: isSelected
                        ? `
                          inset 0 1px 0 ${currentTheme.innerLight},
                          0 22px 55px color-mix(
                            in srgb,
                            var(--mood-glow) 22%,
                            transparent
                          )
                        `
                        : softCrystalStyle.boxShadow,
                    }}
                  >
                    <div
                      className="
                        absolute
                        -right-20
                        -bottom-24
                        w-64
                        h-64
                        rounded-full
                        blur-[80px]
                        opacity-25
                        pointer-events-none
                        transition-all
                        duration-700
                        group-hover:scale-125
                      "
                      style={{
                        background: "var(--mood-glow)",
                      }}
                    />
                    <div
                      className="
                        absolute
                        top-0
                        left-[12%]
                        w-[55%]
                        h-[1px]
                        opacity-60
                      "
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)",
                      }}
                    />
                    <div className="relative z-10">
                      <div
                        className="
                          w-12
                          h-12
                          rounded-full
                          flex
                          items-center
                          justify-center
                          mb-7
                          backdrop-blur-xl
                          transition-all
                          duration-300
                        "
                        style={{
                          background: isSelected
                            ? "var(--mood-main)"
                            : "color-mix(in srgb, var(--mood-main) 12%, transparent)",
                          color: isSelected
                            ? "white"
                            : isNight
                              ? "rgba(255,255,255,0.86)"
                              : "var(--mood-main)",
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3
                        className="text-3xl mb-4"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,0.92)"
                            : "var(--text-primary)",
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        className="leading-relaxed"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,0.60)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {question}
                      </p>
                    </div>
                  </button>
                )
              }
            )}
          </section>
          <section
            className="
              rounded-[52px]
              p-7
              sm:p-9
              lg:p-12
              relative
              overflow-hidden
              backdrop-blur-3xl
              mb-14
            "
            style={crystalStyle}
          >
            <div
              className="
                absolute
                -top-40
                -right-32
                w-[430px]
                h-[430px]
                rounded-full
                blur-[130px]
                opacity-30
                pointer-events-none
              "
              style={{
                background: "var(--mood-glow)",
              }}
            />
            <div
              className="
                absolute
                -bottom-52
                left-[15%]
                w-[420px]
                h-[420px]
                rounded-full
                blur-[140px]
                opacity-15
                pointer-events-none
              "
              style={{
                background: "var(--mood-main)",
              }}
            />
            <div className="relative z-10">
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                  gap-5
                  mb-8
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
                    Private space
                  </p>
                  <h2
                    className="text-4xl"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,0.94)"
                        : "var(--text-primary)",
                    }}
                  >
                    {current.noteTitle}
                  </h2>
                </div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                  "
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.50)"
                      : "var(--text-secondary)",
                  }}
                >
                  <Feather size={15} />
                  <span>Write at your own pace</span>
                </div>
              </div>
              {selectedPrompt && (
                <div
                  className="
                    rounded-[30px]
                    px-6
                    py-5
                    mb-6
                    backdrop-blur-2xl
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 8%, transparent)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.16)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles
                      size={17}
                      className="mt-1 shrink-0"
                      style={{
                        color: "var(--mood-main)",
                      }}
                    />
                    <div>
                      <p
                        className="
                          uppercase
                          tracking-[0.24em]
                          text-[11px]
                          mb-2
                        "
                        style={{
                          color: "var(--mood-main)",
                        }}
                      >
                        Selected prompt
                      </p>
                      <p
                        className="
                          text-lg
                          leading-relaxed
                        "
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,0.86)"
                            : "var(--text-primary)",
                        }}
                      >
                        {selectedPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div
                className="
                  relative
                  rounded-[38px]
                  overflow-hidden
                  backdrop-blur-2xl
                "
                style={{
                  background:
                    currentTheme.softSurface,
                  boxShadow: `
                    inset 0 1px 0 ${currentTheme.innerLight},
                    inset 0 0 50px rgba(255,255,255,${
                      isNight ? "0.015" : "0.07"
                    })
                  `,
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-7
                    pt-6
                    pb-2
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
                      color: isNight
                        ? "rgba(255,255,255,0.52)"
                        : "var(--text-secondary)",
                    }}
                  >
                    <BookOpenText size={15} />
                    <span>Today</span>
                  </div>
                  <div
                    className="
                      w-2
                      h-2
                      rounded-full
                    "
                    style={{
                      background: "var(--mood-main)",
                      boxShadow:
                        "0 0 18px var(--mood-glow)",
                    }}
                  />
                </div>
                <textarea
                  value={journalText}
                  onChange={(event) => {
                    setJournalText(event.target.value)
                    setSaved(false)
                  }}
                  placeholder={
                    selectedPrompt
                      ? "Write your response here..."
                      : current.placeholder
                  }
                  className="
                    w-full
                    min-h-[380px]
                    bg-transparent
                    border-0
                    px-7
                    pt-5
                    pb-8
                    lg:px-8
                    text-lg
                    leading-8
                    outline-none
                    resize-none
                  "
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.88)"
                      : "var(--text-primary)",
                    caretColor: "var(--mood-main)",
                  }}
                />
              </div>
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                  mt-6
                "
              >
                <p
                  className="text-sm"
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.45)"
                      : "var(--text-secondary)",
                  }}
                >
                  {journalText.trim().length} characters
                </p>
                <button
                  type="button"
                  onClick={saveEntry}
                  disabled={!journalText.trim()}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    min-w-[150px]
                    px-7
                    py-3.5
                    rounded-full
                    text-white
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    disabled:opacity-35
                    disabled:cursor-not-allowed
                    cursor-pointer
                    hover:scale-[1.02]
                    active:scale-[0.98]
                  "
                  style={{
                    background: `
                      linear-gradient(
                        135deg,
                        var(--mood-main),
                        color-mix(
                          in srgb,
                          var(--mood-main) 72%,
                          white
                        )
                      )
                    `,
                    boxShadow: journalText.trim()
                      ? `
                        inset 0 1px 0 rgba(255,255,255,.30),
                        0 14px 35px color-mix(
                          in srgb,
                          var(--mood-main) 24%,
                          transparent
                        )
                      `
                      : "none",
                  }}
                >
                  {saved ? (
                    <>
                      <Check size={17} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save entry
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
          <section>
            <div
              className="
                flex
                items-end
                justify-between
                gap-6
                mb-7
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mb-3
                    uppercase
                    tracking-[0.28em]
                    text-xs
                  "
                  style={{
                    color: "var(--mood-main)",
                  }}
                >
                  <History size={15} />
                  <span>Journal history</span>
                </div>
                <h2
                  className="text-4xl"
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.94)"
                      : "var(--text-primary)",
                  }}
                >
                  Previous Entries
                </h2>
              </div>
              {isLoaded && entries.length > 0 && (
                <div
                  className="
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    backdrop-blur-xl
                    shrink-0
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 8%, transparent)",
                    color: isNight
                      ? "rgba(255,255,255,0.70)"
                      : "var(--mood-main)",
                  }}
                >
                  {entries.length}{" "}
                  {entries.length === 1
                    ? "entry"
                    : "entries"}
                </div>
              )}
            </div>
            {isLoaded && entries.length === 0 && (
              <div
                className="
                  min-h-[240px]
                  rounded-[46px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  px-6
                  backdrop-blur-2xl
                "
                style={softCrystalStyle}
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 12%, transparent)",
                    color: "var(--mood-main)",
                  }}
                >
                  <Feather size={19} />
                </div>
                <h3
                  className="text-2xl mb-2"
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.90)"
                      : "var(--text-primary)",
                  }}
                >
                  Your journal is waiting
                </h3>
                <p
                  className="
                    max-w-md
                    leading-relaxed
                  "
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.50)"
                      : "var(--text-secondary)",
                  }}
                >
                  Your saved reflections will appear here.
                </p>
              </div>
            )}
            {entries.length > 0 && (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <article
                    key={entry.id}
                    className="
                      relative
                      rounded-[38px]
                      px-7
                      py-6
                      lg:px-8
                      lg:py-7
                      backdrop-blur-2xl
                      overflow-hidden
                      transition-all
                      duration-300
                      hover:translate-x-1
                    "
                    style={softCrystalStyle}
                  >
                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        w-48
                        h-48
                        rounded-full
                        blur-[80px]
                        opacity-10
                        pointer-events-none
                      "
                      style={{
                        background: "var(--mood-glow)",
                      }}
                    />
                    <div
                      className="
                        relative
                        z-10
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-start
                        lg:justify-between
                        gap-5
                      "
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            mb-4
                          "
                        >
                          <span
                            className="
                              inline-flex
                              items-center
                              px-3
                              py-1.5
                              rounded-full
                              text-xs
                              font-medium
                            "
                            style={{
                              background:
                                "color-mix(in srgb, var(--mood-main) 9%, transparent)",
                              color: isNight
                                ? "rgba(255,255,255,0.72)"
                                : "var(--mood-main)",
                            }}
                          >
                            {moodNames[entry.mood]}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: isNight
                                ? "rgba(255,255,255,0.42)"
                                : "var(--text-secondary)",
                            }}
                          >
                            {formatEntryDate(
                              entry.createdAt
                            )}
                          </span>
                        </div>
                        {entry.prompt && (
                          <p
                            className="
                              text-sm
                              leading-relaxed
                              mb-3
                              italic
                            "
                            style={{
                              color: isNight
                                ? "rgba(255,255,255,0.56)"
                                : "var(--mood-main)",
                            }}
                          >
                            {entry.prompt}
                          </p>
                        )}
                        <p
                          className="
                            leading-7
                            whitespace-pre-wrap
                            break-words
                          "
                          style={{
                            color: isNight
                              ? "rgba(255,255,255,0.80)"
                              : "var(--text-primary)",
                          }}
                        >
                          {entry.text.length > 260
                            ? `${entry.text.slice(
                                0,
                                260
                              )}...`
                            : entry.text}
                        </p>
                      </div>
                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          shrink-0
                        "
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openEntry(entry)
                          }
                          title="Open entry"
                          aria-label="Open journal entry"
                          className="
                            w-11
                            h-11
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:scale-105
                          "
                          style={{
                            color: isNight
                              ? "rgba(255,255,255,0.72)"
                              : "var(--mood-main)",
                            background:
                              "color-mix(in srgb, var(--mood-main) 8%, transparent)",
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,.12)",
                          }}
                        >
                          <ArrowUpRight size={17} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            deleteEntry(entry.id)
                          }
                          title="Delete entry"
                          aria-label="Delete journal entry"
                          className="
                            w-11
                            h-11
                            rounded-full
                            flex
                            items-center
                            justify-center
                            cursor-pointer
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:scale-105
                          "
                          style={{
                            color: isNight
                              ? "rgba(255,255,255,0.52)"
                              : "var(--text-secondary)",
                            background:
                              "rgba(255,255,255,0.04)",
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  )
}
