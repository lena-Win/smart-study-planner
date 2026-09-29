"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  TimerReset,
  Trees,
  BookOpen,
  CalendarDays,
  Settings,
  Leaf,
} from "lucide-react"

import { useMood } from "@/components/theme/MoodContext"
import { useTheme } from "@/components/theme/ThemeContext"

const items = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/",
  },
  {
    icon: TimerReset,
    label: "Focus",
    href: "/focus",
  },
  {
    icon: Trees,
    label: "Garden",
    href: "/garden",
  },
  {
    icon: BookOpen,
    label: "Journal",
    href: "/journal",
  },
  {
    icon: CalendarDays,
    label: "Planner",
    href: "/planner",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  const {
    moodData,
  } = useMood()

  const {
    theme,
  } = useTheme()

  const isNight = theme === "night"

  return (
    <aside
      className="
        liquid-glass
        rounded-[40px]
        p-5
        lg:p-6
        flex
        flex-col
        gap-2
        lg:w-[280px]
        min-h-[680px]
      "
    >
      {/* BRAND */}

      <div className="px-3 pt-2 pb-5">
        <div
          className="
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
            mb-4
          "
          style={{
            background:
              "color-mix(in srgb, var(--mood-main) 16%, transparent)",
            color: "var(--mood-main)",
          }}
        >
          <Leaf size={20} />
        </div>

        <h2
          className="text-3xl"
          style={{
            color: isNight
              ? "rgba(255,255,255,0.94)"
              : "var(--text-primary)",
          }}
        >
          Study Zen
        </h2>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
          "
          style={{
            color: isNight
              ? "rgba(255,255,255,0.46)"
              : "var(--text-secondary)",
          }}
        >
          Calm productivity
        </p>
      </div>

      {/* MENU */}

      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isActive ? "page" : undefined
              }
              className="
                group
                relative
                flex
                items-center
                gap-4
                rounded-[22px]
                px-4
                py-3.5
                transition-all
                duration-300
              "
              style={{
                background: isActive
                  ? "color-mix(in srgb, var(--mood-main) 14%, transparent)"
                  : "transparent",

                boxShadow: isActive
                  ? "0 14px 34px color-mix(in srgb, var(--mood-main) 10%, transparent)"
                  : "none",
              }}
            >
              {/* ACTIVE BAR */}

              <span
                className="
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  w-[3px]
                  rounded-full
                  transition-all
                  duration-300
                "
                style={{
                  height: isActive
                    ? "26px"
                    : "0px",

                  background:
                    "var(--mood-main)",
                }}
              />

              {/* ICON */}

              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shrink-0
                  transition-all
                  duration-300
                  group-hover:scale-105
                "
                style={{
                  background: isActive
                    ? "var(--mood-main)"
                    : isNight
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.28)",

                  color: isActive
                    ? "white"
                    : isNight
                      ? "rgba(255,255,255,0.58)"
                      : "var(--text-secondary)",
                }}
              >
                <Icon size={18} />
              </div>

              {/* LABEL */}

              <span
                className="
                  text-[15px]
                  font-medium
                  transition-colors
                  duration-300
                "
                style={{
                  color: isActive
                    ? isNight
                      ? "rgba(255,255,255,0.95)"
                      : "var(--text-primary)"
                    : isNight
                      ? "rgba(255,255,255,0.58)"
                      : "var(--text-secondary)",
                }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* FOOTER */}

      <div className="mt-auto pt-6">
        <div
          className="
            rounded-[28px]
            border
            p-5
            relative
            overflow-hidden
          "
          style={{
            background: isNight
              ? "rgba(255,255,255,0.035)"
              : "rgba(255,255,255,0.22)",

            borderColor: isNight
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.28)",
          }}
        >
          {/* DECORATIVE GLOW */}

          <div
            className="
              absolute
              -top-12
              -right-10
              w-28
              h-28
              rounded-full
              blur-[36px]
              pointer-events-none
            "
            style={{
              background:
                "color-mix(in srgb, var(--mood-glow) 42%, transparent)",
            }}
          />

          <div
            className="
              relative
              z-10
              flex
              items-start
              gap-3
            "
          >
            <div
              className="
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                shrink-0
              "
              style={{
                background:
                  "color-mix(in srgb, var(--mood-main) 14%, transparent)",

                color:
                  "var(--mood-main)",
              }}
            >
              <Leaf size={17} />
            </div>

            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  mb-1.5
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.38)"
                    : "var(--text-secondary)",
                }}
              >
                Current space
              </p>

              <p
                className="
                  text-sm
                  font-medium
                  mb-2
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.90)"
                    : "var(--text-primary)",
                }}
              >
                {moodData.name}
              </p>

              <p
                className="
                  text-xs
                  leading-relaxed
                "
                style={{
                  color: isNight
                    ? "rgba(255,255,255,0.46)"
                    : "var(--text-secondary)",
                }}
              >
                Breathe slowly.
                <br />
                One task at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}