"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react"
import {
  type MoodId,
  type MoodData,
  moodData,
} from "@/components/mood/moodData"

type MoodContextType = {
  mood: MoodId
  moodData: MoodData
  setMood: (mood: MoodId) => void
}

const STORAGE_KEY = "study-zen-mood"

const MoodContext = createContext<MoodContextType>({
  mood: "calm",
  moodData: moodData.calm,
  setMood: () => {},
})

function isMood(value: string | null): value is MoodId {
  return value === "calm" ||
    value === "focus" ||
    value === "reflect" ||
    value === "restore"
}

function readSavedMood(): MoodId {
  if (typeof window === "undefined") return "calm"
  try {
    const savedMood = window.localStorage.getItem(STORAGE_KEY)
    return isMood(savedMood) ? savedMood : "calm"
  } catch {
    return "calm"
  }
}

export function MoodProvider({
  children,
}: {
  children: ReactNode
}) {
  const [mood, setMoodState] = useState<MoodId>("calm")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedMood = readSavedMood()
    queueMicrotask(() => {
      setMoodState(savedMood)
      setIsLoaded(true)
    })
  }, [])

  const setMood = (newMood: MoodId) => {
    setMoodState(newMood)
    try {
      window.localStorage.setItem(STORAGE_KEY, newMood)
    } catch (error) {
      console.error("Could not save Study Zen mood", error)
    }
  }

  const currentMood = moodData[mood]

  if (!isLoaded) return null

  return (
    <MoodContext.Provider
      value={{
        mood,
        moodData: currentMood,
        setMood,
      }}
    >
      <div
        className="mood-root min-h-screen"
        data-mood={mood}
        style={
          {
            "--mood-main": currentMood.colors.main,
            "--mood-glow": currentMood.colors.glow,
            "--mood-secondary": currentMood.colors.secondary,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </MoodContext.Provider>
  )
}

export function useMood() {
  return useContext(MoodContext)
}