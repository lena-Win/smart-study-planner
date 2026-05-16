"use client"

import { useEffect, useState } from "react"

export default function CursorGlow() {

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {

    function handleMove(e: MouseEvent) {

      setPosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", handleMove)

    return () => {
      window.removeEventListener("mousemove", handleMove)
    }

  }, [])

  return (

    <div
      className="
        fixed
        pointer-events-none
        z-[999]
        w-[260px]
        h-[260px]
        rounded-full
        blur-[90px]
        opacity-30
        mix-blend-screen
        transition-transform
        duration-200
      "
      style={{
        left: position.x - 130,
        top: position.y - 130,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)"
      }}
    />

  )
}