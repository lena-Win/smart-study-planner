"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
export type Theme =
  | "morning"
  | "sunset"
  | "night"
type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
const ThemeContext = createContext<ThemeContextType>({
  theme: "morning",
  setTheme: () => {},
})
export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setThemeState] =
    useState<Theme>("morning")
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "study-zen-theme"
    )
    if (
      savedTheme === "morning" ||
      savedTheme === "sunset" ||
      savedTheme === "night"
    ) {
      setThemeState(savedTheme)
    } else {
      /*
       * Jeżeli użytkownik miał wcześniej zapisany
       * usunięty motyw Forest, automatycznie
       * przechodzimy na Morning.
       */
      setThemeState("morning")
      localStorage.setItem(
        "study-zen-theme",
        "morning"
      )
    }
    setIsLoaded(true)
  }, [])
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(
      "study-zen-theme",
      newTheme
    )
  }
  if (!isLoaded) {
    return null
  }
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div
        className={`theme-${theme} min-h-screen`}
        data-theme={theme}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  return useContext(ThemeContext)
}
