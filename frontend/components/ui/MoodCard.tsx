"use client"
import { motion } from "framer-motion"
type MoodCardProps = {
  emoji: string
  title: string
  subtitle: string
  color: string
}

export default function MoodCard({
  emoji,
  title,
  subtitle,
  color
}: MoodCardProps) {

  return (

    <motion.div

    initial={{
      opacity: 0,
      y: 30
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    transition={{
      duration: 0.8
    }}
    className="
      liquid-glass
      premium-hover
      relative
      overflow-hidden
      rounded-[38px]
      p-8
      min-h-[260px]
      flex
      flex-col
      justify-between
      transition-all
      duration-500
      hover:scale-[1.02]
    "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          bottom-[-40px]
          left-1/2
          -translate-x-1/2
          w-[180px]
          h-[180px]
          blur-3xl
          opacity-50
        "
        style={{
          background: color
        }}
      />

      {/* CONTENT */}

      <div className="relative z-10">

        <div className="
          text-6xl
          mb-6
          float-slow
        ">
          {emoji}
        </div>

        <h3 className="
          text-3xl
          mb-3
          text-[#2b2b2b]
        ">
          {title}
        </h3>

        <p className="
          text-[#6d675f]
          leading-relaxed
        ">
          {subtitle}
        </p>

      </div>

      {/* WATER DROPLET */}

      <div className="
        absolute
        top-6
        right-6
        w-14
        h-14
        rounded-full
        bg-white/20
        backdrop-blur-xl
        border
        border-white/30
        droplet-float
      " />

    </motion.div>
  )
}