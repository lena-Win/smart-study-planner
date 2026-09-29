"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Flower2,
  Leaf,
  Sparkles,
} from "lucide-react"

import AppShell from "@/components/layout/AppShell"
import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"
import type { MoodId } from "@/components/mood/moodData"

import {
  getFocusSessions,
  getPlannerTasks,
  getJournalEntries,
} from "@/components/data/studyData"

import type {
  FocusSession,
  PlannerTask,
  JournalEntry,
} from "@/components/data/types"

/* =========================================================
   TYPES
========================================================= */

type PlantStage =
  | "bud"
  | "young"
  | "full"
  | "bloom"

type FlowerKind =
  | "lotus"
  | "rose"
  | "lily"

type FlowerSlot = {
  left: number
  bottom: number
  width: number
  rotate: number
  opacity: number
  blur: number
  z: number
}

/* =========================================================
   MOOD
========================================================= */

const moodContent: Record<
  MoodId,
  {
    title: string
    description: string
    meadowLabel: string
  }
> = {
  calm: {
    title: "Calm Garden",
    description:
      "A quiet crystal meadow shaped by focus, intention and reflection.",
    meadowLabel:
      "Gentle rituals become something living.",
  },

  focus: {
    title: "Focus Garden",
    description:
      "A luminous meadow where deep work becomes visible growth.",
    meadowLabel:
      "Attention becomes growth.",
  },

  reflect: {
    title: "Reflect Garden",
    description:
      "A dreamy garden shaped by thought, intention and quiet progress.",
    meadowLabel:
      "Reflection leaves a trace.",
  },

  restore: {
    title: "Restore Garden",
    description:
      "A restorative meadow growing slowly through meaningful daily rituals.",
    meadowLabel:
      "Slow growth is still growth.",
  },
}

/* =========================================================
   ASSETS
========================================================= */

const plantAssets = {
  lotus: {
    bud: "/garden/lotus/lotus-bud.png",
    young: "/garden/lotus/lotus-young.png",
    full: "/garden/lotus/lotus-full.png",
    bloom: "/garden/lotus/lotus-bloom.png",
  },

  rose: {
    bud: "/garden/rose/rose-bud.png",
    young: "/garden/rose/rose-young.png",
    full: "/garden/rose/rose-full.png",
    bloom: "/garden/rose/rose-bloom.png",
  },

  lily: {
    bud: "/garden/lily/lily-bud.png",
    young: "/garden/lily/lily-young.png",
    full: "/garden/lily/lily-full.png",
    bloom: "/garden/lily/lily-bloom.png",
  },

  moss: {
    bud: "/garden/moss/moss-bud.png",
    young: "/garden/moss/moss-young.png",
    full: "/garden/moss/moss-full.png",
    bloom: "/garden/moss/moss-bloom.png",
  },
} as const

/* =========================================================
   HELPERS
========================================================= */

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  if (hours === 0) return `${rest}m`
  if (rest === 0) return `${hours}h`

  return `${hours}h ${rest}m`
}

function getStage(progress: number): PlantStage {
  if (progress < 0.25) return "bud"
  if (progress < 0.5) return "young"
  if (progress < 0.8) return "full"

  return "bloom"
}

/* =========================================================
   GROWTH RULES
========================================================= */

function getFocusData(minutes: number) {
  const unit = 60

  return {
    complete: Math.floor(minutes / unit),
    progress: (minutes % unit) / unit,
  }
}

function getPlannerData(tasks: number) {
  const unit = 3

  return {
    complete: Math.floor(tasks / unit),
    progress: (tasks % unit) / unit,
  }
}

function getJournalData(entries: number) {
  const unit = 2

  return {
    complete: Math.floor(entries / unit),
    progress: (entries % unit) / unit,
  }
}

/* =========================================================
   MEADOW SLOTS
========================================================= */

const lotusSlots: FlowerSlot[] = [
  {
    left: 50,
    bottom: 3,
    width: 235,
    rotate: 0,
    opacity: 1,
    blur: 0,
    z: 62,
  },
  {
    left: 35,
    bottom: 5,
    width: 150,
    rotate: -4,
    opacity: 0.9,
    blur: 0,
    z: 53,
  },
  {
    left: 68,
    bottom: 7,
    width: 140,
    rotate: 4,
    opacity: 0.88,
    blur: 0,
    z: 52,
  },
  {
    left: 22,
    bottom: 14,
    width: 105,
    rotate: -5,
    opacity: 0.68,
    blur: 0.3,
    z: 39,
  },
  {
    left: 79,
    bottom: 15,
    width: 100,
    rotate: 5,
    opacity: 0.66,
    blur: 0.4,
    z: 38,
  },
  {
    left: 58,
    bottom: 19,
    width: 88,
    rotate: 2,
    opacity: 0.55,
    blur: 0.5,
    z: 31,
  },
]

const roseSlots: FlowerSlot[] = [
  {
    left: 16,
    bottom: 7,
    width: 175,
    rotate: -4,
    opacity: 1,
    blur: 0,
    z: 58,
  },
  {
    left: 83,
    bottom: 8,
    width: 170,
    rotate: 4,
    opacity: 1,
    blur: 0,
    z: 58,
  },
  {
    left: 39,
    bottom: 13,
    width: 115,
    rotate: 3,
    opacity: 0.8,
    blur: 0.2,
    z: 43,
  },
  {
    left: 64,
    bottom: 15,
    width: 105,
    rotate: -3,
    opacity: 0.76,
    blur: 0.3,
    z: 41,
  },
  {
    left: 7,
    bottom: 19,
    width: 80,
    rotate: -5,
    opacity: 0.58,
    blur: 0.5,
    z: 29,
  },
  {
    left: 92,
    bottom: 20,
    width: 78,
    rotate: 4,
    opacity: 0.56,
    blur: 0.5,
    z: 28,
  },
]

const lilySlots: FlowerSlot[] = [
  {
    left: 29,
    bottom: 7,
    width: 190,
    rotate: -3,
    opacity: 1,
    blur: 0,
    z: 55,
  },
  {
    left: 70,
    bottom: 8,
    width: 195,
    rotate: 3,
    opacity: 1,
    blur: 0,
    z: 55,
  },
  {
    left: 89,
    bottom: 11,
    width: 135,
    rotate: 4,
    opacity: 0.84,
    blur: 0.2,
    z: 45,
  },
  {
    left: 47,
    bottom: 17,
    width: 120,
    rotate: -2,
    opacity: 0.72,
    blur: 0.3,
    z: 38,
  },
  {
    left: 12,
    bottom: 18,
    width: 110,
    rotate: -4,
    opacity: 0.68,
    blur: 0.4,
    z: 34,
  },
  {
    left: 58,
    bottom: 23,
    width: 88,
    rotate: 3,
    opacity: 0.5,
    blur: 0.7,
    z: 25,
  },
]

const slots: Record<
  FlowerKind,
  FlowerSlot[]
> = {
  lotus: lotusSlots,
  rose: roseSlots,
  lily: lilySlots,
}

/* =========================================================
   FLOWER
========================================================= */

function GardenFlower({
  kind,
  stage,
  index,
  developing = false,
}: {
  kind: FlowerKind
  stage: PlantStage
  index: number
  developing?: boolean
}) {
  const flowerSlots = slots[kind]

  const position =
    flowerSlots[index % flowerSlots.length]

  const layer =
    Math.floor(index / flowerSlots.length)

  const depthScale =
    Math.max(
      0.64,
      1 - layer * 0.12
    )

  const depthBottom =
    Math.min(
      29,
      position.bottom + layer * 4
    )

  const sideVariation =
    layer % 2 === 0
      ? layer * 1.5
      : layer * -1.5

  return (
    <div
      className="
        absolute
        pointer-events-none
        select-none
        origin-bottom
        transition-all
        duration-700
      "
      style={{
        left: `${Math.max(
          5,
          Math.min(
            95,
            position.left + sideVariation
          )
        )}%`,

        bottom: `${depthBottom}%`,

        width: `${
          position.width * depthScale
        }px`,

        transform: `
          translateX(-50%)
          rotate(${position.rotate}deg)
        `,

        opacity:
          position.opacity *
          Math.max(
            0.6,
            1 - layer * 0.1
          ),

        filter: `blur(${
          position.blur + layer * 0.15
        }px)`,

        zIndex:
          position.z - layer * 3,
      }}
    >
      <div
        className="
          absolute
          left-1/2
          bottom-[4%]
          -translate-x-1/2
          w-[72%]
          h-[40%]
          rounded-full
          blur-[35px]
        "
        style={{
          background:
            "var(--mood-glow)",
          opacity: developing
            ? 0.22
            : 0.09,
        }}
      />

      <img
        src={plantAssets[kind][stage]}
        alt={`${kind} ${stage}`}
        draggable={false}
        className="
          relative
          block
          w-full
          h-auto
          object-contain
        "
        style={{
          filter: developing
            ? `
              saturate(.88)
              brightness(1.08)
              drop-shadow(
                0 14px 16px
                rgba(75,55,45,.07)
              )
            `
            : `
              saturate(.96)
              brightness(1.02)
              drop-shadow(
                0 14px 18px
                rgba(75,55,45,.08)
              )
            `,
        }}
      />

      {developing && (
        <Sparkles
          size={14}
          className="
            absolute
            top-[3%]
            right-[3%]
            animate-pulse
          "
          style={{
            color:
              "var(--mood-main)",
          }}
        />
      )}
    </div>
  )
}

/* =========================================================
   MOSS
========================================================= */

function MeadowMoss({
  stage,
}: {
  stage: PlantStage
}) {
  return (
    <>
      <img
        src={plantAssets.moss[stage]}
        alt=""
        draggable={false}
        className="
          absolute
          left-[-8%]
          bottom-[-11%]
          w-[48%]
          max-w-none
          pointer-events-none
          select-none
          z-[47]
        "
        style={{
          opacity: 0.9,
          filter:
            "saturate(.82) brightness(1.04)",
        }}
      />

      <img
        src={plantAssets.moss[stage]}
        alt=""
        draggable={false}
        className="
          absolute
          left-[25%]
          bottom-[-13%]
          w-[50%]
          max-w-none
          pointer-events-none
          select-none
          z-[48]
        "
        style={{
          opacity: 0.92,
          filter:
            "saturate(.82) brightness(1.04)",
        }}
      />

      <img
        src={plantAssets.moss[stage]}
        alt=""
        draggable={false}
        className="
          absolute
          right-[-8%]
          bottom-[-11%]
          w-[48%]
          max-w-none
          pointer-events-none
          select-none
          z-[47]
        "
        style={{
          opacity: 0.9,
          filter:
            "saturate(.82) brightness(1.04)",
        }}
      />
    </>
  )
}

/* =========================================================
   CRYSTALS
========================================================= */

function Crystal({
  left,
  bottom,
  size,
  rotate = 0,
}: {
  left: number
  bottom: number
  size: number
  rotate?: number
}) {
  return (
    <div
      className="
        absolute
        z-[42]
        pointer-events-none
      "
      style={{
        left: `${left}%`,
        bottom: `${bottom}%`,
        width: `${size}px`,
        height: `${size * 1.45}px`,
        transform: `
          rotate(${rotate}deg)
        `,
      }}
    >
      <div
        className="
          absolute
          inset-0
          rounded-[48%_52%_44%_56%]
          rotate-45
          backdrop-blur-sm
        "
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,.85),
              color-mix(
                in srgb,
                var(--mood-secondary) 28%,
                rgba(255,255,255,.4)
              ),
              color-mix(
                in srgb,
                var(--mood-main) 18%,
                rgba(255,255,255,.5)
              )
            )
          `,

          border:
            "1px solid rgba(255,255,255,.65)",

          boxShadow: `
            inset 3px 4px 9px
            rgba(255,255,255,.8),

            0 0 22px
            color-mix(
              in srgb,
              var(--mood-glow) 50%,
              transparent
            )
          `,
        }}
      />
    </div>
  )
}

/* =========================================================
   STAT
========================================================= */

function GardenStat({
  icon: Icon,
  eyebrow,
  title,
  value,
}: {
  icon: typeof Clock3
  eyebrow: string
  title: string
  value: string
}) {
  return (
    <div className="py-2">
      <div
        className="
          flex
          items-center
          gap-2
          mb-3
        "
      >
        <Icon
          size={14}
          style={{
            color:
              "var(--mood-main)",
          }}
        />

        <p
          className="
            uppercase
            tracking-[0.22em]
            text-[10px]
            text-secondary
          "
        >
          {eyebrow}
        </p>
      </div>

      <h3
        className="
          text-3xl
          text-primary
          mb-2
        "
      >
        {title}
      </h3>

      <p className="text-secondary">
        {value}
      </p>
    </div>
  )
}

/* =========================================================
   PAGE
========================================================= */

export default function GardenPage() {
  const { mood } = useMood()
  const { theme } = useTheme()

  const current = moodContent[mood]
  const isNight = theme === "night"

  const [
    focusSessions,
    setFocusSessions,
  ] = useState<FocusSession[]>([])

  const [
    plannerTasks,
    setPlannerTasks,
  ] = useState<PlannerTask[]>([])

  const [
    journalEntries,
    setJournalEntries,
  ] = useState<JournalEntry[]>([])

  /* =========================================================
     LOAD STUDY DATA
  ========================================================= */

  useEffect(() => {
    const loadGardenData = () => {
      setFocusSessions(
        getFocusSessions()
      )

      setPlannerTasks(
        getPlannerTasks()
      )

      setJournalEntries(
        getJournalEntries()
      )
    }

    loadGardenData()

    const handleStorage = () => {
      loadGardenData()
    }

    window.addEventListener(
      "storage",
      handleStorage
    )

    window.addEventListener(
      "focus",
      loadGardenData
    )

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      )

      window.removeEventListener(
        "focus",
        loadGardenData
      )
    }
  }, [])

  /* =========================================================
     VALUES
  ========================================================= */

  const totalFocusMinutes =
    useMemo(() => {
      return focusSessions.reduce(
        (total, session) =>
          total +
          (
            typeof session.duration ===
            "number"
              ? session.duration
              : 0
          ),
        0
      )
    }, [focusSessions])

  const completedTasks =
    useMemo(() => {
      return plannerTasks.filter(
        (task) => task.completed
      ).length
    }, [plannerTasks])

  const journalCount =
    journalEntries.length

  const focusGrowth =
    getFocusData(
      totalFocusMinutes
    )

  const plannerGrowth =
    getPlannerData(
      completedTasks
    )

  const journalGrowth =
    getJournalData(
      journalCount
    )

  const visibleLotusCount =
    Math.min(
      focusGrowth.complete,
      12
    )

  const visibleRoseCount =
    Math.min(
      plannerGrowth.complete,
      12
    )

  const visibleLilyCount =
    Math.min(
      journalGrowth.complete,
      12
    )

  const totalCompletedFlowers =
    focusGrowth.complete +
    plannerGrowth.complete +
    journalGrowth.complete

  const mossStage: PlantStage =
    totalCompletedFlowers >= 18
      ? "bloom"
      : totalCompletedFlowers >= 10
        ? "full"
        : totalCompletedFlowers >= 4
          ? "young"
          : "bud"

  const hasAnyGrowth =
    totalCompletedFlowers > 0 ||
    focusGrowth.progress > 0 ||
    plannerGrowth.progress > 0 ||
    journalGrowth.progress > 0

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AppShell>
      <main
        className="
          app-container
          section-spacing
          pb-28
        "
      >
        {/* HEADER */}

        <section
          className="
            max-w-4xl
            mb-12
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
              mb-5
            "
          >
            <Leaf
              size={17}
              style={{
                color:
                  "var(--mood-main)",
              }}
            />

            <p
              className="
                uppercase
                tracking-[0.32em]
                text-xs
              "
              style={{
                color:
                  "var(--mood-main)",
              }}
            >
              Your living progress
            </p>
          </div>

          <h1
            className="
              text-6xl
              lg:text-7xl
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
              leading-relaxed
              max-w-2xl
            "
          >
            {current.description}
          </p>
        </section>

        {/* =================================================
            3D CRYSTAL MEADOW
        ================================================= */}

        <section
          className="
            relative
            h-[720px]
            lg:h-[760px]
            overflow-hidden
            mb-16
            isolate
          "
          style={{
            borderRadius: "72px",

            background: isNight
              ? `
                linear-gradient(
                  180deg,
                  #0a101c 0%,
                  #0d1422 22%,
                  #111a29 48%,
                  #151d2a 68%,
                  #0b121c 100%
                )
              `
              : `
                linear-gradient(
                  180deg,
                  color-mix(
                    in srgb,
                    var(--mood-secondary) 6%,
                    var(--bg)
                  ) 0%,

                  color-mix(
                    in srgb,
                    var(--mood-glow) 5%,
                    var(--bg)
                  ) 45%,

                  color-mix(
                    in srgb,
                    var(--mood-main) 9%,
                    var(--bg)
                  ) 100%
                )
              `,

            boxShadow: isNight
              ? `
                inset 0 1px 0 rgba(255,255,255,.035),
                0 0 90px 45px rgba(10,16,28,.55)
              `
              : `
                inset 0 1px 0 rgba(255,255,255,.35),
                0 0 90px 45px
                color-mix(
                  in srgb,
                  var(--bg) 88%,
                  transparent
                )
              `,
          }}
        >
          {/* EDGE BLEND */}

          <div
            className="
              absolute
              inset-0
              z-[75]
              pointer-events-none
            "
            style={{
              boxShadow: isNight
                ? `
                  inset 55px 0 70px -45px #0a101c,
                  inset -55px 0 70px -45px #0a101c,
                  inset 0 55px 70px -55px #0a101c,
                  inset 0 -55px 70px -45px #0a101c
                `
                : `
                  inset 60px 0 80px -50px var(--bg),
                  inset -60px 0 80px -50px var(--bg),
                  inset 0 60px 80px -55px var(--bg),
                  inset 0 -60px 80px -50px var(--bg)
                `,
            }}
          />

          {/* SUN / MOON */}

          <div
            className="
              absolute
              top-[15%]
              left-1/2
              -translate-x-1/2
              rounded-full
              z-[2]
            "
            style={{
              width:
                isNight
                  ? "74px"
                  : "90px",

              height:
                isNight
                  ? "74px"
                  : "90px",

              background: isNight
                ? `
                  radial-gradient(
                    circle at 38% 35%,
                    #ffffff 0%,
                    #e7ecf6 35%,
                    #bcc8dc 75%,
                    #9cabc4 100%
                  )
                `
                : "rgba(255,249,220,.9)",

              boxShadow: isNight
                ? `
                  0 0 30px rgba(190,210,255,.38),
                  0 0 90px rgba(155,180,230,.18),
                  0 0 160px rgba(120,150,210,.10)
                `
                : `
                  0 0 50px rgba(255,240,225,.65),
                  0 0 130px rgba(255,226,200,.35)
                `,
            }}
          />

          {/* SKY HAZE */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[58%]
              z-[1]
            "
            style={{
              background: isNight
                ? `
                  radial-gradient(
                    circle at 50% 35%,
                    rgba(180,195,230,.10),
                    transparent 27%
                  ),

                  radial-gradient(
                    circle at 20% 45%,
                    rgba(100,120,170,.10),
                    transparent 40%
                  ),

                  radial-gradient(
                    circle at 84% 35%,
                    rgba(130,105,155,.09),
                    transparent 38%
                  )
                `
                : `
                  radial-gradient(
                    circle at 50% 35%,
                    rgba(255,255,255,.55),
                    transparent 25%
                  ),

                  radial-gradient(
                    circle at 20% 45%,
                    var(--mood-glow),
                    transparent 38%
                  ),

                  radial-gradient(
                    circle at 84% 35%,
                    var(--mood-secondary),
                    transparent 38%
                  )
                `,

              opacity:
                isNight
                  ? 0.55
                  : 0.3,
            }}
          />

          {/* DISTANT MOUNTAINS */}

          <div
            className="
              absolute
              left-[-6%]
              bottom-[38%]
              w-[55%]
              h-[210px]
              rounded-[50%_60%_20%_20%]
              blur-[15px]
              z-[3]
            "
            style={{
              background: isNight
                ? `
                  linear-gradient(
                    145deg,
                    #202a39,
                    #151d29
                  )
                `
                : `
                  linear-gradient(
                    145deg,
                    color-mix(
                      in srgb,
                      var(--mood-main) 11%,
                      #dedbd4
                    ),
                    color-mix(
                      in srgb,
                      var(--mood-secondary) 8%,
                      #eee6df
                    )
                  )
                `,

              opacity:
                isNight
                  ? 0.62
                  : 0.45,

              transform:
                "rotate(-5deg)",
            }}
          />

          <div
            className="
              absolute
              right-[-8%]
              bottom-[39%]
              w-[58%]
              h-[230px]
              rounded-[60%_45%_20%_20%]
              blur-[18px]
              z-[3]
            "
            style={{
              background: isNight
                ? `
                  linear-gradient(
                    210deg,
                    #1e2735,
                    #131b27
                  )
                `
                : `
                  linear-gradient(
                    210deg,
                    color-mix(
                      in srgb,
                      var(--mood-secondary) 10%,
                      #ddd9d5
                    ),
                    #eee8e2
                  )
                `,

              opacity:
                isNight
                  ? 0.58
                  : 0.42,

              transform:
                "rotate(4deg)",
            }}
          />

          {/* LAKE / LIGHT PATH */}

          <div
            className="
              absolute
              left-[19%]
              right-[19%]
              bottom-[27%]
              h-[170px]
              rounded-[50%]
              blur-[12px]
              z-[4]
            "
            style={{
              background: isNight
                ? `
                  linear-gradient(
                    180deg,
                    rgba(170,190,220,.08),
                    rgba(110,135,175,.16),
                    rgba(70,90,125,.12)
                  )
                `
                : `
                  linear-gradient(
                    180deg,
                    rgba(255,255,255,.18),
                    rgba(255,245,226,.65),
                    color-mix(
                      in srgb,
                      var(--mood-main) 8%,
                      rgba(255,255,255,.45)
                    )
                  )
                `,

              boxShadow: isNight
                ? "0 0 70px rgba(110,135,190,.12)"
                : "0 0 70px rgba(255,245,225,.55)",
            }}
          />

          {/* DISTANT MEADOW */}

          <div
            className="
              absolute
              left-[-10%]
              right-[-10%]
              bottom-[20%]
              h-[250px]
              rounded-[50%]
              blur-[22px]
              z-[6]
            "
            style={{
              background: isNight
                ? `
                  linear-gradient(
                    180deg,
                    transparent,
                    #17231f 40%,
                    #16251e
                  )
                `
                : `
                  linear-gradient(
                    180deg,
                    transparent,
                    color-mix(
                      in srgb,
                      var(--mood-main) 9%,
                      #eee8dc
                    ) 40%,
                    color-mix(
                      in srgb,
                      var(--mood-main) 20%,
                      #d9d9c8
                    )
                  )
                `,

              opacity:
                isNight
                  ? 0.82
                  : 0.7,
            }}
          />

          {/* CRYSTAL ROCK */}

          <div
            className="
              absolute
              right-[-2%]
              bottom-[21%]
              w-[180px]
              h-[330px]
              z-[8]
              opacity-40
              blur-[1px]
            "
            style={{
              clipPath:
                "polygon(45% 0%, 72% 20%, 92% 52%, 78% 100%, 18% 100%, 0 55%, 20% 23%)",

              background: `
                linear-gradient(
                  135deg,
                  rgba(255,255,255,.72),

                  color-mix(
                    in srgb,
                    var(--mood-secondary) 22%,
                    rgba(255,255,255,.35)
                  ),

                  color-mix(
                    in srgb,
                    var(--mood-main) 15%,
                    rgba(255,255,255,.55)
                  )
                )
              `,

              border:
                "1px solid rgba(255,255,255,.6)",

              boxShadow: `
                inset 20px 0 35px
                rgba(255,255,255,.35),

                0 0 50px
                var(--mood-glow)
              `,
            }}
          />

          {/* LABEL */}

          <div
            className="
              absolute
              top-11
              left-1/2
              -translate-x-1/2
              z-[80]
              text-center
              w-full
              px-6
            "
          >
            <p
              className="
                uppercase
                tracking-[0.38em]
                text-[10px]
                text-secondary
              "
            >
              {current.meadowLabel}
            </p>
          </div>

          {/* DISTANT LIGHTS */}

          {[
            ["12%", "37%"],
            ["23%", "31%"],
            ["38%", "42%"],
            ["62%", "35%"],
            ["75%", "29%"],
            ["88%", "41%"],
          ].map(
            ([left, top], index) => (
              <div
                key={index}
                className="
                  absolute
                  w-[4px]
                  h-[4px]
                  rounded-full
                  z-[12]
                  animate-pulse
                "
                style={{
                  left,
                  top,

                  background:
                    "rgba(255,255,255,.95)",

                  boxShadow:
                    "0 0 13px rgba(255,255,255,.95)",
                }}
              />
            )
          )}

          {/* EMPTY GARDEN */}

          {!hasAnyGrowth && (
            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                text-center
                z-[70]
              "
            >
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  flex
                  items-center
                  justify-center
                  mb-6
                  backdrop-blur-xl
                "
                style={{
                  background:
                    isNight
                      ? "rgba(255,255,255,.08)"
                      : "rgba(255,255,255,.35)",
                }}
              >
                <Flower2
                  size={28}
                  style={{
                    color:
                      "var(--mood-main)",
                  }}
                />
              </div>

              <h2
                className="
                  text-4xl
                  text-primary
                  mb-3
                "
              >
                Your meadow is waiting.
              </h2>

              <p
                className="
                  text-secondary
                  max-w-md
                  leading-relaxed
                "
              >
                Focus, complete a plan or
                write in your journal to grow
                your first crystal flower.
              </p>
            </div>
          )}

          {/* CRYSTALS */}

          {hasAnyGrowth && (
            <>
              <Crystal
                left={9}
                bottom={7}
                size={26}
                rotate={-8}
              />

              <Crystal
                left={25}
                bottom={5}
                size={34}
                rotate={5}
              />

              <Crystal
                left={73}
                bottom={6}
                size={29}
                rotate={-4}
              />

              <Crystal
                left={91}
                bottom={8}
                size={25}
                rotate={7}
              />
            </>
          )}

          {/* LOTUS */}

          {Array.from({
            length:
              visibleLotusCount,
          }).map((_, index) => (
            <GardenFlower
              key={`lotus-${index}`}
              kind="lotus"
              stage="bloom"
              index={index}
            />
          ))}

          {/* ROSES */}

          {Array.from({
            length:
              visibleRoseCount,
          }).map((_, index) => (
            <GardenFlower
              key={`rose-${index}`}
              kind="rose"
              stage="bloom"
              index={index}
            />
          ))}

          {/* LILIES */}

          {Array.from({
            length:
              visibleLilyCount,
          }).map((_, index) => (
            <GardenFlower
              key={`lily-${index}`}
              kind="lily"
              stage="bloom"
              index={index}
            />
          ))}

          {/* GROWING LOTUS */}

          {focusGrowth.progress > 0 && (
            <GardenFlower
              kind="lotus"
              stage={getStage(
                focusGrowth.progress
              )}
              index={
                visibleLotusCount
              }
              developing
            />
          )}

          {/* GROWING ROSE */}

          {plannerGrowth.progress > 0 && (
            <GardenFlower
              kind="rose"
              stage={getStage(
                plannerGrowth.progress
              )}
              index={
                visibleRoseCount
              }
              developing
            />
          )}

          {/* GROWING LILY */}

          {journalGrowth.progress > 0 && (
            <GardenFlower
              kind="lily"
              stage={getStage(
                journalGrowth.progress
              )}
              index={
                visibleLilyCount
              }
              developing
            />
          )}

          {/* MOSS */}

          {hasAnyGrowth && (
            <MeadowMoss
              stage={mossStage}
            />
          )}

          {/* FOREGROUND DEPTH */}

          <div
            className="
              absolute
              left-[-5%]
              right-[-5%]
              bottom-[-50px]
              h-[180px]
              z-[65]
              pointer-events-none
              blur-[3px]
            "
            style={{
              background: isNight
                ? `
                  radial-gradient(
                    ellipse at 20% 100%,
                    #16251e,
                    transparent 48%
                  ),

                  radial-gradient(
                    ellipse at 75% 100%,
                    #18261f,
                    transparent 52%
                  )
                `
                : `
                  radial-gradient(
                    ellipse at 20% 100%,
                    color-mix(
                      in srgb,
                      var(--mood-main) 18%,
                      #d8d8c5
                    ),
                    transparent 48%
                  ),

                  radial-gradient(
                    ellipse at 75% 100%,
                    color-mix(
                      in srgb,
                      var(--mood-main) 16%,
                      #ded8c9
                    ),
                    transparent 52%
                  )
                `,

              opacity:
                isNight
                  ? 0.75
                  : 0.55,
            }}
          />

          {/* FRONT BOKEH */}

          <div
            className="
              absolute
              left-[7%]
              bottom-[3%]
              w-[55px]
              h-[55px]
              rounded-full
              blur-[16px]
              z-[70]
              pointer-events-none
            "
            style={{
              background:
                "var(--mood-glow)",
              opacity: 0.22,
            }}
          />

          <div
            className="
              absolute
              right-[10%]
              bottom-[6%]
              w-[70px]
              h-[70px]
              rounded-full
              blur-[20px]
              z-[70]
              pointer-events-none
            "
            style={{
              background:
                "var(--mood-secondary)",
              opacity: 0.16,
            }}
          />
        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section
          className="
            grid
            md:grid-cols-3
            gap-12
            py-10
            border-y
          "
          style={{
            borderColor:
              "color-mix(in srgb, var(--text) 8%, transparent)",
          }}
        >
          <GardenStat
            icon={Clock3}
            eyebrow="Focus"
            title="Crystal Lotus"
            value={`${formatMinutes(
              totalFocusMinutes
            )} · ${
              focusGrowth.complete
            } ${
              focusGrowth.complete === 1
                ? "lotus"
                : "lotuses"
            }`}
          />

          <GardenStat
            icon={CheckCircle2}
            eyebrow="Planner"
            title="Glass Rose"
            value={`${completedTasks} completed · ${
              plannerGrowth.complete
            } ${
              plannerGrowth.complete === 1
                ? "rose"
                : "roses"
            }`}
          />

          <GardenStat
            icon={BookOpen}
            eyebrow="Journal"
            title="Pearl Lily"
            value={`${journalCount} ${
              journalCount === 1
                ? "entry"
                : "entries"
            } · ${
              journalGrowth.complete
            } ${
              journalGrowth.complete === 1
                ? "lily"
                : "lilies"
            }`}
          />
        </section>
      </main>
    </AppShell>
  )
}