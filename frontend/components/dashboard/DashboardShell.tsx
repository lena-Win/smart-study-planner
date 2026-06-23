"use client"

import Sidebar from "../layout/Sidebar"
import ThemeToggle from "../ui/ThemeToggle"
import { motion } from "framer-motion"

export default function DashboardShell() {
  return (
    <section className="app-container section-spacing pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="space-y-10"
      >

        {/* SIDEBAR */}
        <Sidebar />

        {/* TOP BAR */}
        <div className="
          glass
          rounded-[36px]
          p-8
          flex
          justify-between
          items-center
        ">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#7f8a70] mb-3">
              Today's Energy
            </p>

            <h2 className="text-5xl text-[#2d2d2d]">
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

          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* AMBIENCE SECTION */}
            <div className="
              glass
              rounded-[40px]
              p-8
              relative
              overflow-hidden
            ">

              <div className="
                absolute inset-0
                bg-gradient-to-r
                from-[#dce9d0]/40
                via-[#f7efe4]/30
                to-[#dbe5f6]/40
              " />

              <div className="relative z-10 space-y-10">

                <div className="flex justify-between flex-wrap gap-6">
                  <div>
                    <p className="uppercase tracking-[0.3em] text-sm text-[#7f8a70] mb-3">
                      Ambience Spaces
                    </p>
                    <h2 className="text-4xl text-[#2d2d2d]">
                      Your Atmosphere
                    </h2>
                  </div>

                  <div className="glass px-5 py-3 rounded-full text-sm">
                    🌧 Rain Mode Active
                  </div>
                </div>

                {/* MOOD ENVIRONMENTS */}
                <div className="grid md:grid-cols-4 gap-5">

                  <div className="rounded-[30px] p-6 bg-[#dfe8f3] min-h-[220px]">
                    <div className="text-4xl mb-4">🦦</div>
                    <h3 className="text-2xl mb-2">Otter Focus</h3>
                    <p className="text-sm text-[#5f6470]">
                      Gentle focus with your calm otter companion.
                    </p>
                  </div>

                  <div className="rounded-[30px] p-6 bg-[#f3d8c8] min-h-[220px]">
                    <div className="text-4xl mb-4">🦊</div>
                    <h3 className="text-2xl mb-2">Fox Flow</h3>
                    <p className="text-sm text-[#7a5d4f]">
                      Creative energy and soft curiosity.
                    </p>
                  </div>

                  <div className="rounded-[30px] p-6 bg-[#dbe7d3] min-h-[220px]">
                    <div className="text-4xl mb-4">🐰</div>
                    <h3 className="text-2xl mb-2">Rabbit Garden</h3>
                    <p className="text-sm text-[#5f6c57]">
                      Slow productivity inspired by nature.
                    </p>
                  </div>

                  <div className="rounded-[30px] p-6 bg-[#d9dced] min-h-[220px]">
                    <div className="text-4xl mb-4">🐱</div>
                    <h3 className="text-2xl mb-2">Moon Cat</h3>
                    <p className="text-sm text-[#5e6278]">
                      Quiet evening focus and gentle routines.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* POMODORO */}
            <div className="
              glass
              rounded-[36px]
              p-8
              min-h-[320px]
              relative
              overflow-hidden
            ">

              <div className="
                absolute inset-0
                bg-gradient-to-br
                from-[#dfead4]/40
                to-[#f7d7de]/30
              " />

              <div className="relative z-10">
                <p className="uppercase tracking-[0.3em] text-sm text-[#7f8a70] mb-4">
                  Pomodoro Flow
                </p>

                <h2 className="text-6xl mb-4">
                  25:00
                </h2>

                <p className="text-[#6d675f] max-w-md">
                  Calm deep work with soft ambience and focus support.
                </p>

                <div className="flex gap-4 mt-8">
                  <button className="px-6 py-3 rounded-full bg-[#95ab78] text-white">
                    Start
                  </button>

                  <button className="px-6 py-3 rounded-full glass">
                    Ambience
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="
            glass
            rounded-[36px]
            p-8
            min-h-[400px]
            flex
            flex-col
            justify-between
          ">

            <div>
              <p className="uppercase tracking-[0.3em] text-sm text-[#7f8a70] mb-4">
                Nervous System
              </p>

              <h3 className="text-4xl">
                Low Stress Mode
              </h3>
            </div>

            <div className="text-6xl self-center">
              🫧
            </div>

            <p className="text-[#6d675f]">
              Soft transitions, calm palette, reduced stimulation.
            </p>

          </div>

        </div>

      </motion.div>
    </section>
  )
}