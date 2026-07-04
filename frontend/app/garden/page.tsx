export default function GardenPage() {
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
          Emotional landscape
        </p>

        <h1
          className="
            text-6xl
            text-[#2d2d2d]
            mb-4
          "
        >
          🌿 Mood Garden
        </h1>

        <p
          className="
            text-lg
            text-[#6f6a63]
            max-w-2xl
          "
        >
          Observe your energy, emotions and inner rhythm.
        </p>

      </div>

      {/* MOOD CARDS */}

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {/* PEACEFUL */}

        <div
          className="
            liquid-glass
            rounded-[36px]
            p-8
            min-h-[260px]
            premium-hover
          "
        >

          <div className="text-6xl mb-6">
            🦢
          </div>

          <h3 className="text-3xl mb-3">
            Peaceful
          </h3>

          <p className="text-[#6d675f]">
            Calm focus, slow breathing and emotional balance.
          </p>

        </div>

        {/* REFLECTIVE */}

        <div
          className="
            liquid-glass
            rounded-[36px]
            p-8
            min-h-[260px]
            premium-hover
          "
        >

          <div className="text-6xl mb-6">
            🌧
          </div>

          <h3 className="text-3xl mb-3">
            Reflective
          </h3>

          <p className="text-[#6d675f]">
            Journaling, quiet thoughts and self-awareness.
          </p>

        </div>

        {/* ENERGIZED */}

        <div
          className="
            liquid-glass
            rounded-[36px]
            p-8
            min-h-[260px]
            premium-hover
          "
        >

          <div className="text-6xl mb-6">
            ☀️
          </div>

          <h3 className="text-3xl mb-3">
            Energized
          </h3>

          <p className="text-[#6d675f]">
            Motivation, creativity and positive momentum.
          </p>

        </div>

        {/* RESTING */}

        <div
          className="
            liquid-glass
            rounded-[36px]
            p-8
            min-h-[260px]
            premium-hover
          "
        >

          <div className="text-6xl mb-6">
            🌙
          </div>

          <h3 className="text-3xl mb-3">
            Resting
          </h3>

          <p className="text-[#6d675f]">
            Recovery, softness and nervous-system regulation.
          </p>

        </div>

      </div>

      {/* DAILY ENERGY */}

      <div
        className="
          liquid-glass
          rounded-[42px]
          p-10
          mt-10
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
          Today's Energy
        </p>

        <h2 className="text-5xl mb-4">
          Gentle Matcha Morning 🍵
        </h2>

        <p
          className="
            text-[#6f6a63]
            max-w-3xl
            leading-relaxed
          "
        >
          Your garden feels balanced today. A calm atmosphere,
          soft focus and restorative pace support deep work.
        </p>

      </div>

    </main>
  )
}