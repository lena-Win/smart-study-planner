import Sidebar from "../../components/layout/Sidebar"
export default function PlannerPage() {
  return (

    <main className="
      min-h-screen
      flex
      bg-[#f8f3eb]
    ">

      <Sidebar />

      <div className="
        flex-1
        p-10
      ">

        <div className="
          max-w-[1600px]
          mx-auto
        ">

          {/* HEADER */}

          <div className="
            liquid-glass
            rounded-[40px]
            p-10
            mb-8
          ">

            <p className="
              uppercase
              tracking-[0.3em]
              text-sm
              text-[#7e8b76]
              mb-4
            ">
              Planner Space
            </p>

            <h1 className="
              text-6xl
              text-[#2f2f2f]
              mb-4
            ">
              Gentle Planning
            </h1>

            <p className="
              text-[#6a6a6a]
              text-lg
              max-w-[700px]
              leading-relaxed
            ">
              Organize your energy with clarity,
              softness, and nervous-system friendly structure.
            </p>

          </div>

          {/* GRID */}

          <div className="
            grid
            lg:grid-cols-3
            gap-8
          ">

            {/* TASKS */}

            <div className="
              liquid-glass
              rounded-[40px]
              p-8
              lg:col-span-2
            ">

              <div className="
                flex
                justify-between
                items-center
                mb-8
              ">

                <h2 className="
                  text-3xl
                ">
                  Today’s Flow
                </h2>

                <button className="
                  px-5
                  py-3
                  rounded-full
                  bg-[#dce9d0]
                  hover:scale-[1.03]
                  transition-all
                ">
                  + Add Task
                </button>

              </div>

              <div className="space-y-5">

                {[
                  "Biology Revision",
                  "Math Practice",
                  "Essay Writing",
                  "Reading Session"
                ].map((task) => (

                  <div
                    key={task}
                    className="
                      rounded-[28px]
                      bg-white/30
                      border
                      border-white/30
                      p-6

                      flex
                      justify-between
                      items-center

                      hover:translate-x-1
                      transition-all
                    "
                  >

                    <div>

                      <h3 className="
                        text-xl
                        mb-2
                      ">
                        {task}
                      </h3>

                      <p className="
                        text-[#777]
                      ">
                        Calm focus session
                      </p>

                    </div>

                    <div className="
                      px-4
                      py-2
                      rounded-full
                      bg-[#f4ded3]
                    ">
                      Focus
                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* ENERGY */}

            <div className="
              liquid-glass
              rounded-[40px]
              p-8
            ">

              <div className="mb-8">

                <p className="
                  uppercase
                  tracking-[0.2em]
                  text-sm
                  text-[#7e8b76]
                  mb-3
                ">
                  Energy
                </p>

                <h2 className="
                  text-4xl
                ">
                  Soft Momentum
                </h2>

              </div>

              <div className="
                rounded-[30px]
                bg-gradient-to-br
                from-[#dce9d0]
                to-[#f6e5dc]

                h-[260px]

                flex
                items-center
                justify-center

                text-7xl
              ">
                🦢
              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}