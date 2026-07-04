"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  TimerReset,
  Trees,
  BookOpen,
  MoonStar,
  Sparkles
} from "lucide-react"

const items = [
  {
    icon: LayoutDashboard,
    label: "Home",
    href: "/"
  },
  {
    icon: TimerReset,
    label: "Focus",
    href: "/focus"
  },
  {
    icon: Trees,
    label: "Garden",
    href: "/garden"
  },
  {
    icon: BookOpen,
    label: "Journal",
    href: "/journal"
  },
  {
    icon: MoonStar,
    label: "Planner",
    href: "/planner"
  },
  {
    icon: Sparkles,
    label: "Settings",
    href: "/settings"
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="
        liquid-glass
        rounded-[40px]
        p-6
        flex
        flex-col
        gap-4
        lg:w-[280px]
      "
    >
      {/* LOGO */}

      <div className="mb-4">
        <h2
          className="
            text-3xl
            text-[#2d2d2d]
          "
        >
          Study Zen
        </h2>

        <p
          className="
            text-[#7c7c7c]
            mt-2
          "
        >
          Calm productivity
        </p>
      </div>

      {/* MENU */}

      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`
            flex
            items-center
            gap-4
            rounded-[22px]
            px-5
            py-4
            transition-all
            duration-300

            ${
              pathname === item.href
                ? "bg-white/50 shadow-lg"
                : "hover:bg-white/30"
            }
          `}
        >
          <item.icon
            size={22}
            className="text-[#5f5f5f]"
          />

          <span
            className="
              text-lg
              text-[#4f4f4f]
            "
          >
            {item.label}
          </span>
        </Link>
      ))}

      {/* FOOTER CARD */}

      <div className="mt-auto pt-6">
        <div
          className="
            liquid-glass
            rounded-[28px]
            p-5
            text-center
          "
        >
          <div className="text-4xl mb-3">
            🍵
          </div>

          <p className="text-sm text-[#6a6a6a]">
            Breathe slowly.
            <br />
            One task at a time.
          </p>
        </div>
      </div>
    </aside>
  )
}