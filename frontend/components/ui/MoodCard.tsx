"use client"

import { motion } from "framer-motion"
import { useMood } from "../theme/MoodContext"
import type { MoodId } from "../mood/moodData"

const moods = {
  calm: {
    title: "Calm",
    subtitle: "Soft flow, deep breath and clarity.",
    animal: "Swan",
    color: "#5E82AC",
  },

  focus: {
    title: "Focus",
    subtitle: "Deep work without distractions.",
    animal: "Owl",
    color: "#7B9B68",
  },

  reflect: {
    title: "Reflect",
    subtitle: "Reflection, creativity and gentle ideas.",
    animal: "Butterfly",
    color: "#C88797",
  },

  restore: {
    title: "Restore",
    subtitle: "Slow down, recover and reconnect with yourself.",
    animal: "Deer",
    color: "#6B5648",
  },
} satisfies Record<
  MoodId,
  {
    title: string
    subtitle: string
    animal: string
    color: string
  }
>

type Props = {
  mood: MoodId
}

export default function MoodCard({ mood }: Props) {
  const { mood: activeMood, setMood } = useMood()

  const item = moods[mood]
  const active = activeMood === mood

  return (
    <motion.button
      type="button"
      onClick={() => setMood(mood)}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className={`
        liquid-glass
        premium-hover
        relative
        overflow-hidden
        rounded-[38px]
        p-8
        min-h-[260px]
        flex
        flex-col
        justify-between
        text-left
        transition-all
        duration-500
        cursor-pointer

        ${
          active
            ? "ring-2 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            : ""
        }
      `}
      style={{
        borderColor: active ? item.color : undefined,
      }}
    >
      <div
        className="
          absolute
          bottom-[-40px]
          left-1/2
          -translate-x-1/2
          w-[180px]
          h-[180px]
          blur-3xl
          opacity-50
          pointer-events-none
        "
        style={{
          background: item.color,
        }}
      />

      {active && (
        <div
          className="
            absolute
            top-6
            right-6
            w-4
            h-4
            rounded-full
            pointer-events-none
          "
          style={{
            background: item.color,
          }}
        />
      )}

      <div className="relative z-10 pointer-events-none">
        <p
          className="
            uppercase
            tracking-[0.3em]
            text-xs
            mb-5
          "
          style={{
            color: item.color,
          }}
        >
          Mood Space
        </p>

        <h3
          className="
            text-3xl
            mb-3
            text-primary
          "
        >
          {item.title}
        </h3>

        <p
          className="
            text-secondary
            leading-relaxed
          "
        >
          {item.subtitle}
        </p>

        <p
          className="
            mt-6
            text-xs
            uppercase
            tracking-[0.25em]
            text-secondary
          "
        >
          {item.animal}
        </p>
      </div>
    </motion.button>
  )
}
