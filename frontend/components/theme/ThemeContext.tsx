"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

export type Theme = "morning" | "sunset" | "night"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const STORAGE_KEY = "study-zen-theme"

const ThemeContext = createContext<ThemeContextType>({
  theme: "morning",
  setTheme: () => {},
})

function isTheme(value: string | null): value is Theme {
  return value === "morning" ||
    value === "sunset" ||
    value === "night"
}

function readSavedTheme(): Theme {
  if (typeof window === "undefined") return "morning"
  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)
    return isTheme(savedTheme) ? savedTheme : "morning"
  } catch {
    return "morning"
  }
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setThemeState] = useState<Theme>("morning")

  useEffect(() => {
    const savedTheme = readSavedTheme()
    queueMicrotask(() => {
      setThemeState(savedTheme)
    })
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!isTheme(stored)) {
        window.localStorage.setItem(STORAGE_KEY, "morning")
      }
    } catch (error) {
      console.error("Could not access Study Zen theme storage", error)
    }
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    try {
      window.localStorage.setItem(STORAGE_KEY, newTheme)
    } catch (error) {
      console.error("Could not save Study Zen theme", error)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={'theme-${theme} min-h-screen'} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  return useContext(ThemeContext)
}
