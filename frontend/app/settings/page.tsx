export default function SettingsPage() {
  return (
    <main className="
      app-container
      section-spacing
      pb-24
    ">

      <p className="
        uppercase
        tracking-[0.35em]
        text-sm
        text-[#8b977c]
        mb-4
      ">
        PERSONAL SPACE
      </p>

      <h1 className="
        text-7xl
        mb-12
      ">
        Settings
      </h1>

      <div className="
        grid
        lg:grid-cols-2
        gap-8
      ">

        {/* GUIDE */}

        <div className="
          liquid-glass
          rounded-[40px]
          p-8
        ">

          <h2 className="
            text-4xl
            mb-8
          ">
            Animal Guide
          </h2>

          <div className="
            grid
            grid-cols-2
            gap-5
          ">

            <button className="liquid-glass rounded-[28px] p-8 text-5xl">
              🦢
            </button>

            <button className="liquid-glass rounded-[28px] p-8 text-5xl">
              🦌
            </button>

            <button className="liquid-glass rounded-[28px] p-8 text-5xl">
              🦋
            </button>

            <button className="liquid-glass rounded-[28px] p-8 text-5xl">
              🐈
            </button>

          </div>

        </div>

        {/* COLORS */}

        <div className="
          liquid-glass
          rounded-[40px]
          p-8
        ">

          <h2 className="
            text-4xl
            mb-8
          ">
            Color Mood
          </h2>

          <div className="
            flex
            gap-5
            flex-wrap
          ">

            <div className="w-20 h-20 rounded-full bg-[#dbe9d0]" />
            <div className="w-20 h-20 rounded-full bg-[#f6d3db]" />
            <div className="w-20 h-20 rounded-full bg-[#ece2d2]" />
            <div className="w-20 h-20 rounded-full bg-[#dbe5f6]" />

          </div>

        </div>

        {/* AMBIENCE */}

        <div className="
          liquid-glass
          rounded-[40px]
          p-8
        ">

          <h2 className="
            text-4xl
            mb-8
          ">
            Ambience
          </h2>

          <div className="
            flex
            flex-col
            gap-4
          ">

            <button className="liquid-glass rounded-full p-5">
              🌧 Rain
            </button>

            <button className="liquid-glass rounded-full p-5">
              🌲 Forest
            </button>

            <button className="liquid-glass rounded-full p-5">
              🌊 Ocean
            </button>

            <button className="liquid-glass rounded-full p-5">
              🌙 Night
            </button>

          </div>

        </div>

        {/* THEME */}

        <div className="
          liquid-glass
          rounded-[40px]
          p-8
        ">

          <h2 className="
            text-4xl
            mb-8
          ">
            Theme
          </h2>

          <div className="
            flex
            gap-5
          ">

            <button className="
              px-8
              py-4
              rounded-full
              bg-[#dbe9d0]
            ">
              Light
            </button>

            <button className="
              px-8
              py-4
              rounded-full
              bg-[#dbe5f6]
            ">
              Night
            </button>

          </div>

        </div>

      </div>

    </main>
  )
}
