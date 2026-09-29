export type MoodId =
  | "calm"
  | "focus"
  | "reflect"
  | "restore"

export type MoodData = {
  id: MoodId
  name: string
  description: string

  colors: {
    main: string
    glow: string
    secondary: string
  }

  images: {
    hero: string
    dashboard: string
    focus: string
    planner: string
  }

  garden: {
    lotus: string
    waterLily: string
    animal: string
    stones: string
  }

  textures: {
    primary: string
    secondary: string
    subtle: string
  }
}

export const moodData: Record<MoodId, MoodData> = {
  calm: {
    id: "calm",
    name: "Calm",
    description:
      "Slow down, breathe deeply and return to a quieter state of mind.",

    colors: {
      main: "#5E82AC",
      glow: "#8FA9C5",
      secondary: "#CFC6BA",
    },

    images: {
      hero: "/images/moods/calm/hero.jpg",
      dashboard: "/images/moods/calm/dashboard.jpg",
      focus: "/images/moods/calm/focus.jpg",
      planner: "/images/moods/calm/planner.jpg",
    },

    garden: {
      lotus: "/images/moods/calm/garden/lotus.jpg",
      waterLily: "/images/moods/calm/garden/water-lily.jpg",
      animal: "/images/moods/calm/garden/swan.jpg",
      stones: "/images/moods/calm/garden/stones.jpg",
    },

    textures: {
      primary: "/images/moods/calm/textures/water.jpg",
      secondary: "/images/moods/calm/textures/linen.jpg",
      subtle: "/images/moods/calm/textures/window-shadow.jpg",
    },
  },

  focus: {
    id: "focus",
    name: "Focus",
    description:
      "Clear the noise, settle into the moment and give your attention to one thing.",

    colors: {
      main: "#7FA06A",
      glow: "#A8BD91",
      secondary: "#84715D",
    },

    images: {
      hero: "/images/moods/focus/hero.jpg",
      dashboard: "/images/moods/focus/dashboard.jpg",
      focus: "/images/moods/focus/focus.jpg",
      planner: "/images/moods/focus/planner.jpg",
    },

    garden: {
      lotus: "/images/moods/focus/garden/lotus.jpg",
      waterLily: "/images/moods/focus/garden/water-lily.jpg",
      animal: "/images/moods/focus/garden/animal.jpg",
      stones: "/images/moods/focus/garden/stones.jpg",
    },

    textures: {
      primary: "/images/moods/focus/textures/wood.jpg",
      secondary: "/images/moods/focus/textures/paper.jpg",
      subtle: "/images/moods/focus/textures/shadow.jpg",
    },
  },

  reflect: {
    id: "reflect",
    name: "Reflect",
    description:
      "Make space for your thoughts, emotions and the things that deserve attention.",

    colors: {
      main: "#C98798",
      glow: "#D9A9B5",
      secondary: "#9D8DB5",
    },

    images: {
      hero: "/images/moods/reflect/hero.jpg",
      dashboard: "/images/moods/reflect/dashboard.jpg",
      focus: "/images/moods/reflect/focus.jpg",
      planner: "/images/moods/reflect/planner.jpg",
    },

    garden: {
      lotus: "/images/moods/reflect/garden/lotus.jpg",
      waterLily: "/images/moods/reflect/garden/water-lily.jpg",
      animal: "/images/moods/reflect/garden/animal.jpg",
      stones: "/images/moods/reflect/garden/stones.jpg",
    },

    textures: {
      primary: "/images/moods/reflect/textures/paper.jpg",
      secondary: "/images/moods/reflect/textures/fabric.jpg",
      subtle: "/images/moods/reflect/textures/shadow.jpg",
    },
  },

  restore: {
    id: "restore",
    name: "Restore",
    description:
      "Step away from pressure, recover your energy and begin again gently.",

    colors: {
      main: "#5A4638",
      glow: "#8A6F5A",
      secondary: "#334A69",
    },

    images: {
      hero: "/images/moods/restore/hero.jpg",
      dashboard: "/images/moods/restore/dashboard.jpg",
      focus: "/images/moods/restore/focus.jpg",
      planner: "/images/moods/restore/planner.jpg",
    },

    garden: {
      lotus: "/images/moods/restore/garden/lotus.jpg",
      waterLily: "/images/moods/restore/garden/water-lily.jpg",
      animal: "/images/moods/restore/garden/animal.jpg",
      stones: "/images/moods/restore/garden/stones.jpg",
    },

    textures: {
      primary: "/images/moods/restore/textures/wood.jpg",
      secondary: "/images/moods/restore/textures/fabric.jpg",
      subtle: "/images/moods/restore/textures/shadow.jpg",
    },
  },
}
