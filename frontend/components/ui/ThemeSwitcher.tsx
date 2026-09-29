"use client"
import {
  Sun,
  Sunset,
  Moon,
  type LucideIcon,
} from "lucide-react"
import {
  useTheme,
  type Theme,
} from "../theme/ThemeContext"
const themes: {
  id: Theme
  label: string
  icon: LucideIcon
}[] = [
  {
    id: "morning",
    label: "Morning",
    icon: Sun,
  },
  {
    id: "sunset",
    label: "Sunset",
    icon: Sunset,
  },
  {
    id: "night",
    label: "Night",
    icon: Moon,
  },
]
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  return (
    <div
      className="
        liquid-glass
        rounded-full
        p-2
        flex
        gap-2
        w-fit
      "
    >
      {themes.map(({ id, label, icon: Icon }) => {
        const active = theme === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            title={label}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={active}
            className={`
              w-12
              h-12
              rounded-full
              flex
              items-center
              justify-center
              cursor-pointer
              transition-all
              duration-300
              ${
                active
                  ? "bg-white/90 shadow-lg scale-105"
                  : "hover:bg-white/30"
              }
            `}
          >
            <Icon size={20} />
          </button>
        )
      })}
    </div>
  )
}
