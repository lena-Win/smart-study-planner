"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ThemeToggle() {

  const [dark, setDark] = useState(false)

  function toggleTheme() {

    setDark(!dark)

    if (!dark) {

      document.documentElement.classList.add("dark")

    } else {

      document.documentElement.classList.remove("dark")

    }
  }

  return (

    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      onClick={toggleTheme}
      className="
        glass
        glass-shimmer
        rounded-full
        px-5
        py-3
        flex
        items-center
        gap-3
      "
    >

      <span className="text-xl">
        {dark ? "🌙" : "☀️"}
      </span>

      <span className="text-[#4b4b4b] dark:text-white">
        {dark ? "Night Mode" : "Day Mode"}
      </span>

    </motion.button>
  )
}