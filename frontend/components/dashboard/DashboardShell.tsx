"use client"
import Sidebar from "../layout/Sidebar"
import ThemeToggle from "../ui/ThemeToggle"
import { motion } from "framer-motion"
export default function DashboardShell() {

  return (

    <section className="
      app-container
      section-spacing
      pb-24
    ">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1}}
        className="
          space-y-8
        "
      >
        {/* SIDEBAR */}

        <Sidebar />

        {/* CONTENT */}

        <div className="space-y-8">

          {/* TOP BAR */}

          <div className="
            glass
            rounded-[36px]
            glass-shimmer
            premium-hover
            p-8
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                uppercase
                tracking-[0.3em]
                text-sm
                text-[#7f8a70]
                mb-3
              ">
                Today's Energy
              </p>

              <h2 className="
                text-5xl
                text-[#2d2d2d]
              ">
                Gentle Focus
              </h2>

            </div>

            <ThemeToggle />

          </div>

          {/* GRID */}

          <div className="
            grid
            xl:grid-cols-[1.4fr_1fr]
            gap-8
            items-start
          ">
            {/* AMBIENCE */}

<div className="
  glass
  glass-shimmer
  premium-hover
  rounded-[40px]
  p-8
  overflow-hidden
  relative
">

  {/* BG */}

  <div className="
    absolute
    inset-0
    bg-gradient-to-r
    from-[#dce9d0]/40
    via-[#f7efe4]/30
    to-[#dbe5f6]/40
  " />

  <div className="relative z-10">

    <div className="
      flex
      justify-between
      items-center
      mb-10
      flex-wrap
      gap-6
    ">

      <div>

        <p className="
          uppercase
          tracking-[0.3em]
          text-sm
          text-[#7f8a70]
          mb-3
        ">
          Ambience Spaces
        </p>

        <h2 className="
          text-5xl
          text-[#2d2d2d]
        ">
          Your Atmosphere
        </h2>

      </div>

      <div className="
        glass
        px-5
        py-3
        rounded-full
      ">
        🌧 Rain Mode Active
      </div>

    </div>

    {/* CARDS */}

    <div className="
      grid
      md:grid-cols-4
      gap-5
    ">

      {/* RAIN */}

      <div className="
        rounded-[30px]
        min-h-[260px]
        relative
        overflow-hidden
        p-6
        bg-[#dfe8f3]
      ">

        {/* RAIN LINES */}

        <div className="
          absolute
          inset-0
          opacity-30
        ">

          <div className="absolute left-[20%] top-0 w-[1px] h-full bg-white/70 animate-pulse" />
          <div className="absolute left-[40%] top-0 w-[1px] h-full bg-white/70 animate-pulse" />
          <div className="absolute left-[70%] top-0 w-[1px] h-full bg-white/70 animate-pulse" />

        </div>

        <div className="relative z-10">

          <div className="text-5xl mb-6">
            🌧
          </div>

          <h3 className="text-3xl mb-3">
            Rain
          </h3>

          <p className="text-[#5f6470]">
            Soft rainfall and deep concentration.
          </p>

        </div>

      </div>

      {/* SUNSET */}

      <div className="
        rounded-[30px]
        min-h-[260px]
        p-6
        bg-[#f3d8c8]
        flex
        flex-col
        justify-between
      ">

        <div className="text-5xl">
          🌅
        </div>

        <div>

          <h3 className="text-3xl mb-3">
            Sunset
          </h3>

          <p className="text-[#7a5d4f]">
            Warm evening energy and slow flow.
          </p>

        </div>

      </div>

      {/* FOREST */}

      <div className="
        rounded-[30px]
        min-h-[260px]
        p-6
        bg-[#dbe7d3]
        flex
        flex-col
        justify-between
      ">

        <div className="text-5xl">
          🌲
        </div>

        <div>

          <h3 className="text-3xl mb-3">
            Forest
          </h3>

          <p className="text-[#5f6c57]">
            Grounded focus and nervous system calm.
          </p>

        </div>

      </div>

      {/* NIGHT */}

      <div className="
        rounded-[30px]
        min-h-[260px]
        p-6
        bg-[#d9dced]
        flex
        flex-col
        justify-between
      ">

        <div className="text-5xl">
          🌙
        </div>

        <div>

          <h3 className="text-3xl mb-3">
            Night
          </h3>

          <p className="text-[#5e6278]">
            Deep quiet and minimal stimulation.
          </p>

        </div>

      </div>

    </div>

  </div>

</div>
            {/* POMODORO */}

            <div className="
              glass
              rounded-[36px]
              glass-shimmer
              premium-hover
              p-8
              lg:col-span-2
              min-h-[400px]
              relative
              overflow-hidden
            ">

              <div className="
                absolute
                inset-0
                breathe-glow
                bg-gradient-to-br
                from-[#dfead4]/50
                to-[#f7d7de]/30
              " />

              <div className="relative z-10">

                <p className="
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-[#7f8a70]
                  mb-4
                ">
                  Pomodoro Flow
                </p>

                <h2 className="
                  text-7xl
                  mb-6
                ">
                  25:00
                </h2>

                <p className="
                  text-[#6d675f]
                  max-w-md
                  leading-relaxed
                ">
                  Enter a calm deep-work state with ambient sound and reduced distractions.
                </p>

                <div className="
                  flex
                  gap-4
                  mt-10
                ">

                  <button className="
                    px-7
                    py-4
                    rounded-full
                    bg-[#95ab78]
                    text-white
                  ">
                    Start Session
                  </button>

                  <button className="
                    px-7
                    py-4
                    rounded-full
                    glass
                  ">
                    Rain Ambience
                  </button>

                </div>

              </div>

            </div>

            {/* SIDE CARD */}

            <div className="
              glass
              rounded-[36px]
              glass-shimmer
              premium-hover
              p-8
              min-h-[400px]
              flex
              flex-col
              justify-between
            ">

              <div>

                <p className="
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  text-[#7f8a70]
                  mb-4
                ">
                  Nervous System
                </p>

                <h3 className="
                  text-4xl
                  leading-tight
                ">
                  Low Cortisol
                  <br />
                  Mode
                </h3>

              </div>

              <div className="
                text-7xl
                self-center
                float-slow
              ">
                🫧
              </div>

              <p className="
                text-[#6d675f]
              ">
                Reduced stimulation, softer colors and calmer transitions.
              </p>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  )
}