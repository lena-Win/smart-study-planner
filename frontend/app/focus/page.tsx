"use client"
import { useEffect, useState } from "react"
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import Sidebar from "../../components/layout/Sidebar"
import { motion } from "framer-motion"

export default function FocusPage() {
const SESSION_TIME = 25 * 60

const [timeLeft, setTimeLeft] = useState(SESSION_TIME)

const [isRunning, setIsRunning] = useState(false)
useEffect(() => {

  let interval: NodeJS.Timeout

  if (isRunning && timeLeft > 0) {

    interval = setInterval(() => {

      setTimeLeft(prev => prev - 1)

    }, 1000)

  }

  return () => clearInterval(interval)

}, [isRunning, timeLeft])
const minutes = Math.floor(timeLeft / 60)

const seconds = timeLeft % 60

const percentage =
  ((SESSION_TIME - timeLeft) / SESSION_TIME) * 100

  return (

    <main className="
      min-h-screen
      flex
      overflow-hidden
      relative

      bg-gradient-to-br
      from-[#dce6f2]
      via-[#eef3f7]
      to-[#d9e3ef]
    ">

      {/* RAIN LIGHT */}

      <div className="
        absolute
        inset-0
        opacity-20
      ">

        <div className="
          absolute
          left-[10%]
          top-0
          h-full
          w-[1px]
          bg-white/70
          animate-pulse
        " />

        <div className="
          absolute
          left-[30%]
          top-0
          h-full
          w-[1px]
          bg-white/60
          animate-pulse
        " />

        <div className="
          absolute
          left-[55%]
          top-0
          h-full
          w-[1px]
          bg-white/50
          animate-pulse
        " />

        <div className="
          absolute
          left-[75%]
          top-0
          h-full
          w-[1px]
          bg-white/60
          animate-pulse
        " />

      </div>

      {/* WATER GLOW */}

      <div className="
        absolute
        top-[-100px]
        right-[-100px]

        w-[500px]
        h-[500px]

        rounded-full

        bg-white/30

        blur-[140px]

        breathe-glow
      " />

      <Sidebar />

      {/* CONTENT */}

      <div className="
        flex-1
        relative
        z-10

        flex
        items-center
        justify-center

        p-10
      ">

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.95
          }}

          animate={{
            opacity: 1,
            scale: 1
          }}

          transition={{
            duration: 1
          }}

          className="
            liquid-glass
            glass-shimmer

            rounded-[60px]

            w-full
            max-w-[1000px]

            p-14

            relative
            overflow-hidden
          "
        >

          {/* INTERNAL GLOW */}

          <div className="
            absolute
            inset-0

            bg-gradient-to-br
            from-white/20
            via-transparent
            to-[#d9e3ef]/30

            pointer-events-none
          " />

          <div className="
            relative
            z-10
          ">

            {/* TOP */}

            <div className="
              flex
              justify-between
              items-center
              mb-14
            ">

              <div>

                <p className="
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-[#748392]
                  mb-4
                ">
                  Focus Atmosphere
                </p>

                <h1 className="
                  text-6xl
                  text-[#2d3742]
                ">
                  Rain Session
                </h1>

              </div>

              <div className="
                liquid-glass
                rounded-full
                px-6
                py-4
              ">
                🌧 Deep Focus
              </div>

            </div>

            {/* CENTER */}

            <div className="
              flex
              flex-col
              items-center
              justify-center
            ">

              {/* ANIMAL */}

              <motion.div

                animate={{
                  y: [0, -10, 0]
                }}

                transition={{
                  duration: 5,
                  repeat: Infinity
                }}

                className="
                  text-[120px]
                  mb-10
                "
              >
                🦭
              </motion.div>

              {/* TIMER */}

              <div className="
                relative
                mb-10
              ">

                {/* GLOW */}

                <div className="
                  absolute
                  inset-0

                  rounded-full

                  bg-white/40

                  blur-[80px]

                  scale-125

                  breathe-glow
                " />

                <div className="
                  relative
                  z-10
                  w-[320px]
                  h-[320px]
                ">
                    <CircularProgressbar
                    value={percentage}
                    strokeWidth={2}
                    styles={buildStyles({
                        pathColor: "rgba(255,255,255,0.9)",
                        trailColor: "rgba(255,255,255,0.12)",
                        strokeLinecap: "round"
                    })}
                />
                <div className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                ">
                <div className="
                    text-7xl
                    text-[#31404d]
                ">

                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}

                </div>
            </div>
        </div>
        </div>
              {/* BUTTONS */}

              <div className="
                flex
                gap-5
              ">

                <button 
                    onClick={() => setIsRunning(!isRunning)}
                    className="
                        px-8
                        py-4
                        rounded-full
                        bg-white/50
                        hover:scale-[1.04]
                        transition-all
                        text-[#2f3942]
                    "
                >

                    {isRunning ? "Pause Session" : "Start Session"}
                </button>
                <button
                    onClick={() => {
                        setIsRunning(false)
                        setTimeLeft(SESSION_TIME)
                    }}
                    className="
                        px-8
                        py-4
                        rounded-full
                        bg-[#e8ddd2]
                        hover:scale-[1.04]
                        transition-all
                        text-[#4e433c]
                    "
                >
                    Reset
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </main>
  )
}