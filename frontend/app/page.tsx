"use client"

import {
  Check,
  Palette,
} from "lucide-react"

import Hero from "@/components/sections/Hero"
import MoodCard from "@/components/ui/MoodCard"
import AmbientBackground from "@/components/ui/AmbientBackground"
import CursorGlow from "@/components/ui/CursorGlow"
import AppShell from "@/components/layout/AppShell"

import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"

/* =========================================================
   THEME EFFECTS
========================================================= */

const themeEffects = {
  morning: {
    glowPrimary: "rgba(255, 229, 185, 0.28)",
    glowSecondary: "rgba(215, 228, 197, 0.28)",
    glowThird: "rgba(218, 227, 239, 0.22)",
    surface: "rgba(255,255,255,0.26)",
    border: "rgba(255,255,255,0.34)",
  },

  sunset: {
    glowPrimary: "rgba(198, 128, 105, 0.26)",
    glowSecondary: "rgba(210, 155, 133, 0.22)",
    glowThird: "rgba(142, 111, 139, 0.18)",
    surface: "rgba(255,247,242,0.24)",
    border: "rgba(255,255,255,0.30)",
  },

  night: {
    glowPrimary: "rgba(79, 98, 142, 0.28)",
    glowSecondary: "rgba(51, 74, 105, 0.24)",
    glowThird: "rgba(75, 63, 95, 0.20)",
    surface: "rgba(18,24,38,0.30)",
    border: "rgba(255,255,255,0.10)",
  },
} as const

const themeNames = {
  morning: "Morning",
  sunset: "Sunset",
  night: "Night",
} as const

/* =========================================================
   PAGE
========================================================= */

export default function HomePage() {
  const { moodData } = useMood()
  const { theme } = useTheme()

  /*
    Forest został usunięty z Home.

    Jeżeli ThemeContext jest już poprawiony i zawiera tylko:
    morning | sunset | night
    ten fallback praktycznie nigdy nie będzie potrzebny.
  */

  const safeTheme =
    theme === "morning" ||
    theme === "sunset" ||
    theme === "night"
      ? theme
      : "morning"

  const currentTheme = themeEffects[safeTheme]
  const currentThemeName = themeNames[safeTheme]

  const isNight = safeTheme === "night"

  return (
    <AppShell>
      <main
        className="
          min-h-screen
          relative
          overflow-hidden
        "
      >
        {/* =================================================
            BACKGROUND
        ================================================= */}

        <AmbientBackground />
        <CursorGlow />

        {/* THEME GLOW — LEFT */}

        <div
          className="
            fixed
            top-[80px]
            left-[22%]
            w-[360px]
            h-[360px]
            rounded-full
            blur-[130px]
            opacity-60
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: currentTheme.glowPrimary,
          }}
        />

        {/* MOOD GLOW — RIGHT */}

        <div
          className="
            fixed
            top-[430px]
            right-[3%]
            w-[420px]
            h-[420px]
            rounded-full
            blur-[140px]
            opacity-45
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: "var(--mood-glow)",
          }}
        />

        {/* BOTTOM GLOW */}

        <div
          className="
            fixed
            bottom-[20px]
            left-[45%]
            w-[320px]
            h-[320px]
            rounded-full
            blur-[130px]
            opacity-40
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: currentTheme.glowThird,
          }}
        />

        {/* SMALL SECONDARY LIGHT */}

        <div
          className="
            fixed
            top-[18%]
            right-[18%]
            w-[220px]
            h-[220px]
            rounded-full
            blur-[110px]
            opacity-25
            pointer-events-none
            transition-all
            duration-700
          "
          style={{
            background: currentTheme.glowSecondary,
          }}
        />

        {/* =================================================
            HERO
        ================================================= */}

        <div className="relative z-10">
          <Hero />
        </div>

        {/* =================================================
            MOOD SPACES
        ================================================= */}

        <section
          className="
            app-container
            section-spacing
            relative
            z-10
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:justify-between
              lg:items-end
              gap-8
              mb-12
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  mb-4
                "
                style={{
                  color: "var(--mood-main)",
                }}
              >
                <Palette size={15} />

                <span>
                  Choose your space
                </span>
              </div>

              <h2
                className="
                  text-5xl
                  lg:text-6xl
                  mb-4
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.94)"
                    : "var(--text-primary)",
                }}
              >
                Mood Spaces
              </h2>

              <p
                className="
                  max-w-xl
                  leading-relaxed
                  text-base
                  lg:text-lg
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.52)"
                    : "var(--text-secondary)",
                }}
              >
                Choose the emotional space that fits
                what you need right now. Your selection
                follows you through Study Zen.
              </p>
            </div>

            {/* CURRENT SPACE */}

            <div
              className="
                rounded-[30px]
                border
                px-5
                py-4
                backdrop-blur-2xl
                flex
                items-center
                gap-4
                min-w-[245px]
              "
              style={{
                background: currentTheme.surface,
                borderColor: currentTheme.border,
                boxShadow: isNight
                  ? "0 18px 60px rgba(0,0,0,0.14)"
                  : "0 18px 60px rgba(110,90,70,0.05)",
              }}
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
                style={{
                  background: "var(--mood-main)",
                  color: "white",
                }}
              >
                <Check size={16} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.24em]
                    mb-1
                  "
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.40)"
                      : "var(--text-secondary)",
                  }}
                >
                  Current space
                </p>

                <p
                  className="font-medium"
                  style={{
                    color: isNight
                      ? "rgba(255,255,255,0.90)"
                      : "var(--text-primary)",
                  }}
                >
                  {moodData.name} +{" "}
                  {currentThemeName}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              MOOD CARDS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >
            <MoodCard mood="calm" />
            <MoodCard mood="focus" />
            <MoodCard mood="reflect" />
            <MoodCard mood="restore" />
          </div>
        </section>

        <div className="h-24" />
      </main>
    </AppShell>
  )
}