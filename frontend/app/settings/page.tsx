"use client"
import {
  Check,
  CloudSun,
  Focus,
  Heart,
  MoonStar,
  Palette,
  Settings2,
  Sparkles,
  SunMedium,
  Sunset,
  type LucideIcon,
} from "lucide-react"
import AppShell from "@/components/layout/AppShell"
import { useMood } from "@/components/theme/MoodContext"
import { useTheme, type Theme } from "@/components/theme/ThemeContext"
import type { MoodId } from "@/components/mood/moodData"
type MoodOption = {
  id: MoodId
  name: string
  description: string
  icon: LucideIcon
  preview: string
}
type ThemeOption = {
  id: Theme
  name: string
  description: string
  icon: LucideIcon
  preview: string
}
const moodOptions: MoodOption[] = [
  {
    id: "calm",
    name: "Calm",
    description:
      "Soft, spacious and peaceful. Designed for gentle study and quiet reflection.",
    icon: CloudSun,
    preview:
      "linear-gradient(135deg, rgba(173,207,196,.95), rgba(225,237,230,.92), rgba(244,238,225,.92))",
  },
  {
    id: "focus",
    name: "Focus",
    description:
      "Clear and intentional. A focused atmosphere for deep work and concentration.",
    icon: Focus,
    preview:
      "linear-gradient(135deg, rgba(117,148,137,.96), rgba(184,204,193,.92), rgba(229,235,226,.9))",
  },
  {
    id: "reflect",
    name: "Reflect",
    description:
      "Dreamy and introspective. Made for journaling, thinking and slower moments.",
    icon: Sparkles,
    preview:
      "linear-gradient(135deg, rgba(174,158,191,.96), rgba(215,204,222,.92), rgba(239,231,232,.92))",
  },
  {
    id: "restore",
    name: "Restore",
    description:
      "Warm and restorative. A softer space for recovery, balance and gentle progress.",
    icon: Heart,
    preview:
      "linear-gradient(135deg, rgba(193,151,142,.96), rgba(229,199,184,.92), rgba(242,228,210,.92))",
  },
]
const themeOptions: ThemeOption[] = [
  {
    id: "morning",
    name: "Morning",
    description:
      "Bright, airy and softly illuminated with warm natural light.",
    icon: SunMedium,
    preview:
      "linear-gradient(135deg, #fff9ef 0%, #f6eee1 45%, #e8ddd0 100%)",
  },
  {
    id: "sunset",
    name: "Sunset",
    description:
      "Warm evening light with soft peach, rose and muted golden tones.",
    icon: Sunset,
    preview:
      "linear-gradient(135deg, #f2c5ad 0%, #d99f91 45%, #9b7886 100%)",
  },
  {
    id: "night",
    name: "Night",
    description:
      "Deep, quiet and atmospheric with soft moonlit crystal tones.",
    icon: MoonStar,
    preview:
      "linear-gradient(135deg, #111827 0%, #1c2638 45%, #313b55 100%)",
  },
]
export default function SettingsPage() {
  const { mood, setMood } = useMood()
  const { theme, setTheme } = useTheme()
  const isNight = theme === "night"
  const mainSurface = {
    background: isNight
      ? `
        linear-gradient(
          135deg,
          rgba(35,43,60,.56),
          rgba(19,25,39,.38),
          rgba(46,53,72,.32)
        )
      `
      : `
        linear-gradient(
          135deg,
          rgba(255,255,255,.52),
          rgba(255,255,255,.24),
          rgba(255,250,244,.32)
        )
      `,
    border: isNight
      ? "1px solid rgba(255,255,255,.10)"
      : "1px solid rgba(255,255,255,.34)",
    boxShadow: isNight
      ? `
        inset 0 1px 0 rgba(255,255,255,.11),
        0 28px 80px rgba(0,0,0,.18)
      `
      : `
        inset 0 1px 0 rgba(255,255,255,.72),
        0 28px 80px rgba(70,55,40,.055)
      `,
  }
  const softSurface = {
    background: isNight
      ? `
        linear-gradient(
          135deg,
          rgba(42,50,68,.34),
          rgba(18,24,38,.20)
        )
      `
      : `
        linear-gradient(
          135deg,
          rgba(255,255,255,.40),
          rgba(255,255,255,.15)
        )
      `,
    border: isNight
      ? "1px solid rgba(255,255,255,.09)"
      : "1px solid rgba(255,255,255,.30)",
    boxShadow: isNight
      ? `
        inset 0 1px 0 rgba(255,255,255,.09),
        0 18px 45px rgba(0,0,0,.12)
      `
      : `
        inset 0 1px 0 rgba(255,255,255,.62),
        0 18px 45px rgba(70,55,40,.035)
      `,
  }
  return (
    <AppShell>
      <main className="app-container section-spacing relative overflow-hidden pb-28">
        <div
          className="fixed top-[8%] right-[4%] w-[520px] h-[520px] rounded-full blur-[160px] opacity-45 pointer-events-none transition-all duration-700"
          style={{
            background: "var(--mood-glow)",
          }}
        />
        <div
          className="fixed bottom-[5%] left-[10%] w-[420px] h-[420px] rounded-full blur-[150px] opacity-20 pointer-events-none"
          style={{
            background: "var(--mood-main)",
          }}
        />
        <div className="relative z-10">
          <header className="max-w-3xl mb-14">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-6 backdrop-blur-xl"
              style={{
                background:
                  "color-mix(in srgb, var(--mood-main) 12%, transparent)",
                color: "var(--mood-main)",
              }}
            >
              <Settings2 size={21} />
            </div>
            <p
              className="uppercase tracking-[0.3em] text-sm mb-4"
              style={{
                color: "var(--mood-main)",
              }}
            >
              Your space
            </p>
            <h1 className="text-6xl text-primary mb-4">
              Settings
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Shape the atmosphere of Study Zen. Choose the mood that supports your
              intention and the light that feels right for this moment.
            </p>
          </header>
          <section
            className="relative rounded-[54px] p-7 sm:p-9 lg:p-12 mb-10 overflow-hidden backdrop-blur-3xl"
            style={mainSurface}
          >
            <div
              className="absolute -top-40 -right-32 w-[430px] h-[430px] rounded-full blur-[130px] opacity-25 pointer-events-none"
              style={{
                background: "var(--mood-glow)",
              }}
            />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
                <div>
                  <div
                    className="flex items-center gap-2 uppercase tracking-[0.28em] text-xs mb-3"
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    <Sparkles size={14} />
                    <span>Emotional atmosphere</span>
                  </div>
                  <h2
                    className="text-4xl mb-3"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.94)"
                        : "var(--text-primary)",
                    }}
                  >
                    Choose your mood
                  </h2>
                  <p
                    className="leading-relaxed max-w-xl"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.52)"
                        : "var(--text-secondary)",
                    }}
                  >
                    Mood changes the emotional character of the interface while
                    keeping your Study Zen space familiar.
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm backdrop-blur-xl shrink-0"
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 9%, transparent)",
                    color: isNight
                      ? "rgba(255,255,255,.72)"
                      : "var(--mood-main)",
                  }}
                >
                  Current ·{" "}
                  {moodOptions.find((option) => option.id === mood)?.name}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {moodOptions.map((option) => {
                  const Icon = option.icon
                  const active = mood === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setMood(option.id)}
                      className="relative min-h-[290px] rounded-[40px] p-5 text-left overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 group"
                      style={{
                        ...softSurface,
                        border: active
                          ? "1px solid color-mix(in srgb, var(--mood-main) 42%, transparent)"
                          : softSurface.border,
                        boxShadow: active
                          ? `
                            inset 0 1px 0 rgba(255,255,255,.24),
                            0 22px 60px color-mix(
                              in srgb,
                              var(--mood-glow) 22%,
                              transparent
                            )
                          `
                          : softSurface.boxShadow,
                      }}
                    >
                      <div
                        className="relative h-[120px] rounded-[30px] mb-6 overflow-hidden"
                        style={{
                          background: option.preview,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/5" />
                        <div
                          className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full blur-[28px] opacity-50"
                          style={{
                            background: active
                              ? "var(--mood-glow)"
                              : "rgba(255,255,255,.55)",
                          }}
                        />
                        <div
                          className="absolute left-4 top-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-xl"
                          style={{
                            background: active
                              ? "var(--mood-main)"
                              : "rgba(255,255,255,.34)",
                            color: active
                              ? "white"
                              : "rgba(50,50,50,.72)",
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        {active && (
                          <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/80 text-black/70 flex items-center justify-center backdrop-blur-xl">
                            <Check size={15} />
                          </div>
                        )}
                      </div>
                      <h3
                        className="text-2xl mb-2"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,.92)"
                            : "var(--text-primary)",
                        }}
                      >
                        {option.name}
                      </h3>
                      <p
                        className="text-sm leading-6"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,.50)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {option.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
          <section
            className="relative rounded-[54px] p-7 sm:p-9 lg:p-12 overflow-hidden backdrop-blur-3xl"
            style={mainSurface}
          >
            <div
              className="absolute -bottom-40 left-[15%] w-[420px] h-[420px] rounded-full blur-[140px] opacity-15 pointer-events-none"
              style={{
                background: "var(--mood-main)",
              }}
            />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-9">
                <div>
                  <div
                    className="flex items-center gap-2 uppercase tracking-[0.28em] text-xs mb-3"
                    style={{
                      color: "var(--mood-main)",
                    }}
                  >
                    <Palette size={14} />
                    <span>Light & atmosphere</span>
                  </div>
                  <h2
                    className="text-4xl mb-3"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.94)"
                        : "var(--text-primary)",
                    }}
                  >
                    Choose your theme
                  </h2>
                  <p
                    className="leading-relaxed max-w-xl"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.52)"
                        : "var(--text-secondary)",
                    }}
                  >
                    Theme controls the light of your workspace. Move from a soft
                    morning glow to warm sunset tones or a deeper night atmosphere.
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm backdrop-blur-xl shrink-0"
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 9%, transparent)",
                    color: isNight
                      ? "rgba(255,255,255,.72)"
                      : "var(--mood-main)",
                  }}
                >
                  Current ·{" "}
                  {themeOptions.find((option) => option.id === theme)?.name}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  const active = theme === option.id
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTheme(option.id)}
                      className="relative min-h-[330px] rounded-[42px] p-5 text-left overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 group"
                      style={{
                        ...softSurface,
                        border: active
                          ? "1px solid color-mix(in srgb, var(--mood-main) 42%, transparent)"
                          : softSurface.border,
                        boxShadow: active
                          ? `
                            inset 0 1px 0 rgba(255,255,255,.22),
                            0 24px 65px color-mix(
                              in srgb,
                              var(--mood-glow) 20%,
                              transparent
                            )
                          `
                          : softSurface.boxShadow,
                      }}
                    >
                      <div
                        className="relative h-[165px] rounded-[32px] mb-6 overflow-hidden"
                        style={{
                          background: option.preview,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
                        <div className="absolute left-[12%] top-[16%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                        <div className="absolute right-[10%] bottom-[10%] w-24 h-24 rounded-full bg-white/15 blur-[28px]" />
                        <div className="absolute left-4 top-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/25 text-white backdrop-blur-xl border border-white/20">
                          <Icon size={18} />
                        </div>
                        {active && (
                          <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/85 text-black/70 flex items-center justify-center backdrop-blur-xl">
                            <Check size={15} />
                          </div>
                        )}
                      </div>
                      <h3
                        className="text-2xl mb-2"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,.92)"
                            : "var(--text-primary)",
                        }}
                      >
                        {option.name}
                      </h3>
                      <p
                        className="text-sm leading-6"
                        style={{
                          color: isNight
                            ? "rgba(255,255,255,.50)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {option.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
          <section className="mt-10">
            <div
              className="rounded-[40px] px-7 py-6 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 backdrop-blur-2xl"
              style={softSurface}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "color-mix(in srgb, var(--mood-main) 11%, transparent)",
                    color: "var(--mood-main)",
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <p
                    className="text-lg mb-1"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.90)"
                        : "var(--text-primary)",
                    }}
                  >
                    Your atmosphere is saved automatically
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: isNight
                        ? "rgba(255,255,255,.48)"
                        : "var(--text-secondary)",
                    }}
                  >
                    Study Zen will remember your selected mood and theme when you
                    return.
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 text-sm shrink-0"
                style={{
                  color: "var(--mood-main)",
                }}
              >
                <Check size={16} />
                <span>Saved</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  )
}