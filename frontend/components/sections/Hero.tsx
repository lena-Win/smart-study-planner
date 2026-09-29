"use client"

import ThemeSwitcher from "../ui/ThemeSwitcher"
import { useMood } from "../theme/MoodContext"
import { useTheme } from "../theme/ThemeContext"

/* =========================================================
   HERO CONTENT
========================================================= */

const heroContent = {
  calm: {
    eyebrow: "Calm space",

    title: (
      <>
        Create a calmer
        <br />
        way to study.
      </>
    ),

    subtitle:
      "Gentle productivity inspired by nature, mindfulness and intentional living.",

    image: "/images/moods/calm/hero.jpg",

    cardOneLabel: "Today's Mood",
    cardOneTitle: "Calm",
    cardOneText:
      "A quiet space for clarity, steady energy and a softer pace.",
    cardOneValue: "87%",

    cardTwoLabel: "Daily Focus",
    cardTwoTitle: "2h 18m",
    cardTwoText:
      "You completed two deep focus sessions today. Keep the gentle momentum.",
  },

  focus: {
    eyebrow: "Focus space",

    title: (
      <>
        Protect your
        <br />
        deep work.
      </>
    ),

    subtitle:
      "Build meaningful focus sessions with fewer distractions and more intentional attention.",

    image: "/images/moods/focus/focus-hero.jpg",

    cardOneLabel: "Today's Mood",
    cardOneTitle: "Focus",
    cardOneText:
      "Clear attention, fewer distractions and deeper concentration.",
    cardOneValue: "92%",

    cardTwoLabel: "Deep Work",
    cardTwoTitle: "1h 42m",
    cardTwoText:
      "Your focus is steady. Stay with one meaningful task at a time.",
  },

  reflect: {
    eyebrow: "Reflect space",

    title: (
      <>
        Make space
        <br />
        to reflect.
      </>
    ),

    subtitle:
      "Slow down, notice what matters and give your thoughts room to unfold naturally.",

    image: "/images/moods/reflect/reflect-hero.jpg",

    cardOneLabel: "Today's Mood",
    cardOneTitle: "Reflect",
    cardOneText:
      "A softer pace for journaling, creativity and thoughtful moments.",
    cardOneValue: "74%",

    cardTwoLabel: "Journal",
    cardTwoTitle: "18 min",
    cardTwoText:
      "Take a moment to write, reflect and reconnect with your intentions.",
  },

  restore: {
    eyebrow: "Restore space",

    title: (
      <>
        Rest is part
        <br />
        of growth.
      </>
    ),

    subtitle:
      "Create space for recovery, stillness and a more balanced rhythm.",

    image: "/images/moods/restore/restore-hero.jpg",

    cardOneLabel: "Today's Mood",
    cardOneTitle: "Restore",
    cardOneText:
      "A slower rhythm designed for recovery, quiet and renewal.",
    cardOneValue: "68%",

    cardTwoLabel: "Recovery",
    cardTwoTitle: "24 min",
    cardTwoText:
      "Step away from pressure and give yourself space to recover.",
  },
} as const

/* =========================================================
   THEME EFFECTS
========================================================= */

const themeEffects = {
  morning: {
    imageFilter:
      "brightness(1.08) saturate(0.92) contrast(0.96)",

    overlay: `
      linear-gradient(
        90deg,
        rgba(255, 247, 232, 0.38) 0%,
        rgba(255, 249, 238, 0.15) 45%,
        rgba(255, 255, 255, 0.03) 100%
      )
    `,

    glow:
      "rgba(255, 239, 211, 0.48)",
  },

  sunset: {
    imageFilter:
      "brightness(0.96) saturate(1.03) contrast(1.01)",

    overlay: `
      linear-gradient(
        90deg,
        rgba(190, 112, 91, 0.28) 0%,
        rgba(211, 145, 118, 0.12) 48%,
        rgba(126, 82, 111, 0.05) 100%
      )
    `,

    glow:
      "rgba(221, 154, 125, 0.36)",
  },

  night: {
    imageFilter:
      "brightness(0.66) saturate(0.76) contrast(1.08)",

    overlay: `
      linear-gradient(
        90deg,
        rgba(28, 40, 63, 0.52) 0%,
        rgba(35, 48, 71, 0.30) 48%,
        rgba(20, 28, 44, 0.18) 100%
      )
    `,

    glow:
      "rgba(91, 112, 150, 0.28)",
  },
} as const

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const { mood } = useMood()
  const { theme } = useTheme()

  const current = heroContent[mood]

  /*
    Fallback chroni Hero, jeśli w ThemeContext
    została jeszcze stara wartość "forest".
  */

  const safeTheme =
    theme === "morning" ||
    theme === "sunset" ||
    theme === "night"
      ? theme
      : "morning"

  const currentTheme =
    themeEffects[safeTheme]

  const isNight =
    safeTheme === "night"

  return (
    <section
      className="
        relative
        app-container
        mt-8
      "
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[48px]
          min-h-[780px]
          soft-shadow
        "
      >
        {/* =================================================
            BACKGROUND IMAGE
        ================================================= */}

        <img
          src={current.image}
          alt={`${current.cardOneTitle} Study Zen atmosphere`}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            scale-[1.02]
            transition-all
            duration-700
          "
          style={{
            filter:
              currentTheme.imageFilter,
          }}
        />

        {/* =================================================
            THEME ATMOSPHERE
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background:
              currentTheme.overlay,
          }}
        />

        {/* =================================================
            MOOD COLOR
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: `
              linear-gradient(
                90deg,

                color-mix(
                  in srgb,
                  var(--mood-main) 12%,
                  transparent
                ),

                transparent 62%
              )
            `,
          }}
        />

        {/* =================================================
            THEME GLOW
        ================================================= */}

        <div
          className="
            absolute
            -top-32
            -left-20
            w-[520px]
            h-[520px]
            rounded-full
            blur-[120px]
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background:
              currentTheme.glow,
          }}
        />

        {/* =================================================
            HERO CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-20
            h-[780px]
            flex
            items-center
            px-8
            md:px-14
            lg:px-24
          "
        >
          <div className="max-w-[620px]">

            {/* THEME SWITCHER */}

            <div className="mb-8">
              <ThemeSwitcher />
            </div>

            {/* EYEBROW */}

            <p
              className="
                uppercase
                tracking-[0.35em]
                text-sm
                mb-6
                transition-colors
                duration-500
              "
              style={{
                color: isNight
                  ? "rgba(235, 240, 248, 0.88)"
                  : "var(--mood-main)",
              }}
            >
              {current.eyebrow}
            </p>

            {/* TITLE */}

            <h1
              className="
                text-6xl
                lg:text-8xl
                leading-[0.92]
                transition-colors
                duration-500
              "
              style={{
                color: isNight
                  ? "#F4F1EA"
                  : "var(--text)",
              }}
            >
              {current.title}
            </h1>

            {/* SUBTITLE */}

            <p
              className="
                mt-8
                text-xl
                leading-relaxed
                max-w-xl
                transition-colors
                duration-500
              "
              style={{
                color: isNight
                  ? "rgba(244, 241, 234, 0.82)"
                  : "var(--text-secondary, #5f5c57)",
              }}
            >
              {current.subtitle}
            </p>

          </div>
        </div>

        {/* =================================================
            FLOATING CARDS
        ================================================= */}

        <div
          className="
            absolute
            top-12
            right-12
            z-30
            flex
            flex-col
            gap-6
            w-[300px]
          "
        >
          {/* CARD 1 — MOOD */}

          <div
            className="
              liquid-glass
              rounded-[30px]
              p-6
              border
              border-white/30
              backdrop-blur-3xl
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              hero-float
              hover:scale-[1.03]
              transition-all
              duration-700
            "
          >
            <p
              className="
                uppercase
                tracking-[0.3em]
                text-xs
                mb-3
              "
              style={{
                color: isNight
                  ? "rgba(232, 237, 246, 0.82)"
                  : "var(--mood-main)",
              }}
            >
              {current.cardOneLabel}
            </p>

            <h3
              className="
                text-3xl
                mb-2
              "
              style={{
                color: isNight
                  ? "#F4F1EA"
                  : "var(--text)",
              }}
            >
              {current.cardOneTitle}
            </h3>

            <p
              className="
                leading-relaxed
              "
              style={{
                color: isNight
                  ? "rgba(244, 241, 234, 0.76)"
                  : "var(--text-secondary, #5f5c57)",
              }}
            >
              {current.cardOneText}
            </p>

            {/* PROGRESS */}

            <div
              className="
                mt-5
                h-2
                rounded-full
                bg-white/30
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                "
                style={{
                  width:
                    current.cardOneValue,

                  background:
                    "var(--mood-main)",
                }}
              />
            </div>

            <p
              className="
                mt-2
                text-right
                text-sm
              "
              style={{
                color: isNight
                  ? "rgba(244, 241, 234, 0.70)"
                  : "var(--text-secondary, #5f5c57)",
              }}
            >
              {current.cardOneValue}
            </p>
          </div>

          {/* CARD 2 — ACTIVITY */}

          <div
            className="
              liquid-glass
              rounded-[30px]
              p-6
              border
              border-white/30
              backdrop-blur-3xl
              shadow-[0_20px_60px_rgba(0,0,0,0.12)]
              hero-float-delay
              hover:scale-[1.03]
              transition-all
              duration-700
            "
          >
            <p
              className="
                uppercase
                tracking-[0.3em]
                text-xs
                mb-3
              "
              style={{
                color: isNight
                  ? "rgba(232, 237, 246, 0.82)"
                  : "var(--mood-secondary)",
              }}
            >
              {current.cardTwoLabel}
            </p>

            <h3
              className="
                text-3xl
                mb-3
              "
              style={{
                color: isNight
                  ? "#F4F1EA"
                  : "var(--text)",
              }}
            >
              {current.cardTwoTitle}
            </h3>

            <p
              className="
                leading-relaxed
              "
              style={{
                color: isNight
                  ? "rgba(244, 241, 234, 0.76)"
                  : "var(--text-secondary, #5f5c57)",
              }}
            >
              {current.cardTwoText}
            </p>
          </div>
        </div>

        {/* =================================================
            SECONDARY MOOD GLOW
        ================================================= */}

        <div
          className="
            absolute
            bottom-[-100px]
            right-[30%]
            w-[280px]
            h-[280px]
            rounded-full
            blur-[100px]
            opacity-30
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background:
              "var(--mood-secondary)",
          }}
        />

      </div>
    </section>
  )
}