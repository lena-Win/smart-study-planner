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

const MoodContext = createContext<MoodContextType>({
  mood: "calm",
  moodData: moodData.calm,
  setMood: () => {},
})

export function MoodProvider({
  children,
}: {
  children: ReactNode
}) {
  const [mood, setMoodState] = useState<MoodId>("calm")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedMood = localStorage.getItem("study-zen-mood")

    if (
      savedMood === "calm" ||
      savedMood === "focus" ||
      savedMood === "reflect" ||
      savedMood === "restore"
    ) {
      setMoodState(savedMood)
    }

    setIsLoaded(true)
  }, [])

  const setMood = (newMood: MoodId) => {
    setMoodState(newMood)
    localStorage.setItem("study-zen-mood", newMood)
  }

  const currentMood = moodData[mood]

  if (!isLoaded) {
    return null
  }

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