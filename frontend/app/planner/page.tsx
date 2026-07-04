export default function PlannerPage() {
  return (
    <main className="app-container section-spacing">

      {/* HEADER */}

      <div className="mb-12">

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-[#7c8b68]
            mb-4
          "
        >
          Intentional planning
        </p>

        <h1
          className="
            text-6xl
            text-[#2d2d2d]
            mb-4
          "
        >
          📅 Planner
        </h1>

        <p
          className="
            text-lg
            text-[#6f6a63]
            max-w-2xl
          "
        >
          Organize your day with calm structure.
        </p>

      </div>

      {/* TOP GRID */}

      <div
        className="
          grid
          lg:grid-cols-3
          gap-6
          mb-8
        "
      >

        {/* TODAY */}

        <div className="liquid-glass rounded-[36px] p-8">

          <div className="text-5xl mb-5">
            🌿
          </div>

          <h3 className="text-2xl mb-3">
            Today's Focus
          </h3>

          <p className="text-[#6d675f]">
            Complete your most important task first.
          </p>

        </div>

        {/* ENERGY */}

        <div className="liquid-glass rounded-[36px] p-8">

          <div className="text-5xl mb-5">
            ☀️
          </div>

          <h3 className="text-2xl mb-3">
            Energy Level
          </h3>

          <p className="text-[#6d675f]">
            Match your schedule to your energy.
          </p>

        </div>

        {/* BALANCE */}

        <div className="liquid-glass rounded-[36px] p-8">

          <div className="text-5xl mb-5">
            🦢
          </div>

          <h3 className="text-2xl mb-3">
            Balance
          </h3>

          <p className="text-[#6d675f]">
            Productivity without overwhelm.
          </p>

        </div>

      </div>

      {/* TASK LIST */}

      <div
        className="
          liquid-glass
          rounded-[42px]
          p-10
          mb-8
        "
      >

        <h2 className="text-4xl mb-6">
          Today's Tasks
        </h2>

        <div className="space-y-4">

          <div className="glass rounded-[22px] p-5 flex gap-4 items-center">
            <input type="checkbox" />
            <span>Review biology notes</span>
          </div>

          <div className="glass rounded-[22px] p-5 flex gap-4 items-center">
            <input type="checkbox" />
            <span>Complete Pomodoro session</span>
          </div>

          <div className="glass rounded-[22px] p-5 flex gap-4 items-center">
            <input type="checkbox" />
            <span>Journal for 10 minutes</span>
          </div>

        </div>

      </div>

      {/* WEEKLY GOAL */}

      <div
        className="
          liquid-glass
          rounded-[42px]
          p-10
        "
      >

        <p
          className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-[#7c8b68]
            mb-4
          "
        >
          Weekly Intention
        </p>

        <h2 className="text-5xl mb-4">
          Consistency over intensity 🌸
        </h2>

        <p
          className="
            text-[#6f6a63]
            max-w-3xl
          "
        >
          Small daily actions create sustainable growth.
        </p>

      </div>

    </main>
  )
}