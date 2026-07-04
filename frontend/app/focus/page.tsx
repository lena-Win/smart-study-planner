export default function FocusPage() {
  return (
    <main className="app-container section-spacing">

      {/* HEADER */}

      <div className="mb-12">

      <p className="
        uppercase
        tracking-[0.35em]
        text-sm
      text-[#8b977c]
        mb-4
      ">
        YOUR SACRED SPACE
      </p>

      <h1 className="
        text-7xl
      text-[#2d2d2d]
      ">
        Focus Sanctuary
      </h1>
       
      </div>

      {/* MAIN GRID */}

      <div className="
        grid
        lg:grid-cols-[1.3fr_0.8fr]
        gap-8
      ">

        {/* TIMER */}

        <div className="
          liquid-glass
          rounded-[40px]
          p-10
          min-h-[520px]
          flex
          flex-col
          justify-center
          items-center
          text-center
        ">

          <p className="
            uppercase
            tracking-[0.3em]
            text-sm
            text-[#7c8b68]
            mb-6
          ">
            Pomodoro
          </p>

          <h2 className="
            text-[120px]
            leading-none
            mb-8
          ">
            25:00
          </h2>
        <p className="
          mt-5
          uppercase
          tracking-[0.25em]
          text-sm
        text-[#7f8a70]
        ">
          Deep focus with gentle energy
        </p>

          <div className="
            flex
            gap-4
          ">

            <button className="
              px-8
              py-4
              rounded-full
              bg-[#9eb58a]
              text-white
            ">
              Begin Session
            </button>

            <button className="
              px-8
              py-4
              rounded-full
              glass
            ">
              Breathing Mode
            </button>

          </div>

        </div>

        {/* SIDE PANEL */}

        <div className="
          flex
          flex-col
          gap-6
        ">

        {/* SWAN */}

        <div className="
          liquid-glass
          rounded-[34px]
          p-8
          premium-hover
        ">

        <h3 className="
          text-4xl
          mb-3
        ">
          🦢 Swan Lake
        </h3>

        <p className="text-[#6d675f]">
          Soft focus, clarity and graceful flow.
        </p>

      </div>

      {/* FOREST */}

      <div className="
        liquid-glass
        rounded-[34px]
        p-8
        premium-hover
      ">

        <h3 className="
          text-4xl
          mb-3
        ">
          🦌 Forest Sanctuary
        </h3>

        <p className="text-[#6d675f]">
          Grounding energy and nervous system calm.
        </p>

      </div>

      {/* DREAM */}

      <div className="
        liquid-glass
        rounded-[34px]
        p-8
        premium-hover
      ">

        <h3 className="
          text-4xl
          mb-3
        ">
          🦋 Dream Garden
        </h3>

        <p className="text-[#6d675f]">
          Creativity, journaling and gentle reflection.
        </p>

      </div>

      {/* COZY */}

      <div className="
        liquid-glass
        rounded-[34px]
        p-8
        premium-hover
      ">

        <h3 className="
          text-4xl
          mb-3
        ">
          🐈 Cozy Focus
        </h3>

        <p className="text-[#6d675f]">
          Deep work with warm ambience and comfort.
        </p>

      </div>

    </div>

          
        </div>

    </main>
  )
}