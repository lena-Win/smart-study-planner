export default function JournalPage() {
  return (
    <main className="app-container section-spacing">

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
          Self reflection
        </p>

        <h1
          className="
            text-6xl
            text-[#2d2d2d]
            mb-4
          "
        >
          📔 Journal
        </h1>

        <p
          className="
            text-lg
            text-[#6f6a63]
            max-w-2xl
          "
        >
          Slow down and notice what is happening within.
        </p>

      </div>

      {/* PROMPTS */}

      <div
        className="
          grid
          lg:grid-cols-3
          gap-6
          mb-8
        "
      >

        <div className="liquid-glass rounded-[36px] p-8">
          <div className="text-5xl mb-5">🌸</div>

          <h3 className="text-2xl mb-3">
            Gratitude
          </h3>

          <p className="text-[#6d675f]">
            What are three things you appreciate today?
          </p>
        </div>

        <div className="liquid-glass rounded-[36px] p-8">
          <div className="text-5xl mb-5">☁️</div>

          <h3 className="text-2xl mb-3">
            Reflection
          </h3>

          <p className="text-[#6d675f]">
            What emotion needs your attention today?
          </p>
        </div>

        <div className="liquid-glass rounded-[36px] p-8">
          <div className="text-5xl mb-5">🦢</div>

          <h3 className="text-2xl mb-3">
            Intention
          </h3>

          <p className="text-[#6d675f]">
            How do you want to feel by the end of today?
          </p>
        </div>

      </div>

      {/* JOURNAL AREA */}

      <div
        className="
          liquid-glass
          rounded-[42px]
          p-10
        "
      >

        <h2 className="text-4xl mb-6">
          Today's Notes
        </h2>

        <textarea
          placeholder="Write your thoughts here..."
          className="
            w-full
            min-h-[320px]
            rounded-[28px]
            bg-white/30
            border
            border-white/40
            p-6
            text-lg
            outline-none
            resize-none
          "
        />

      </div>

    </main>
  )
}