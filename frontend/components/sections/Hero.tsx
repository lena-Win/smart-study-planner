import ChromeButton from "../ui/ChromeButton"

export default function Hero() {

  return (

    <section className="
      relative
      z-10
      max-w-[1600px]
      mx-auto
      px-8
      pt-12
      grid
      lg:grid-cols-2
      gap-12
      items-center
      backdrop-blur-3xl
      border-white/20
      shadow-[0_20px_60px_rgba(255,255,255,0.08)]
    ">

      {/* LEFT */}

      <div>

        <p className="
          uppercase
          tracking-[0.35em]
          text-sm
          text-[#7c8b68]
          mb-6
        ">
          Calm productivity platform
        </p>

        <h1 className="
          text-6xl
          lg:text-8xl
          leading-[0.95]
          text-[#2d2d2d]
        ">
          Study with clarity,
          live with intention.
        </h1>

        <p className="
          mt-8
          text-lg
          leading-relaxed
          text-[#6f6a63]
          max-w-xl
        ">
          A calm space to plan, focus and grow —
          without pressure or chaos.
        </p>
        <div className="
        liquid-glass
        glass-shimmer
        mt-10
        inline-flex
        items-center
        gap-4
        px-6
        py-4
        rounded-full
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-[#c7d9b7]
            animate-pulse
          " />

          <p className="
            text-[#5c5c5c]
            tracking-wide
          ">
            Nervous-system friendly productivity
          </p>
        </div>
        <div className="flex gap-5 mt-10">

          <ChromeButton>
            Start your journey
          </ChromeButton>

          <button className="
            px-6
            py-3
            rounded-full
            bg-white/40
            border
            border-white/50
          ">
            Watch ambience
          </button>

        </div>

      </div>

      {/* RIGHT */}

      <div className="relative">

        <div className="
          glass
          rounded-[42px]
          overflow-hidden
          soft-shadow
          h-[700px]
          relative
        ">
        {/* CINEMATIC OVERLAY */}

        <div className="
          absolute
          inset-0
          z-10
          bg-gradient-to-t
          from-black/20
          via-transparent
          to-white/10
        " />

        {/* LIQUID LIGHT */}

        <div className="
          absolute
          top-[-20%]
          left-[10%]
          w-[500px]
          h-[500px]
          rounded-full
          bg-white/20
          blur-[120px]
          opacity-50
          animate-pulse
          z-10
        " />
          <img
            src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=1400&auto=format&fit=crop"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              scale-[1.02]
              hover:scale-[1.05]
              transition-all
              duration-[4000ms]
              ease-out
            "/>
        {/* FLOATING GLASS */}

        <div className="
        absolute
        bottom-8
        left-8
        z-20
        liquid-glass
        glass-shimmer
        rounded-[30px]
        px-6
        py-5
        max-w-[320px]
        backdrop-blur-3xl
        ">

          <p className="
            uppercase
            tracking-[0.25em]
            text-xs
            text-white/70
            mb-3
          ">
            Focus Atmosphere
          </p>

          <h3 className="
            text-2xl
            text-white
            mb-2
          ">
            Rain Session
          </h3>

          <p className="
            text-white/80
            leading-relaxed
          ">
            Gentle rain ambience with softened interface motion for deep focus.
          </p>
        </div>
          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#f8f4ec]/70
            to-transparent
          " />

        </div>

      </div>

    </section>
  )
}