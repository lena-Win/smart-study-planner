export default function AmbientBackground() {

  return (

    <>

      {/* TOP LIGHT */}

      <div className="
        absolute
        top-[-120px]
        left-[10%]
        w-[500px]
        h-[500px]
        rounded-full
        bg-[#f7e3d7]
        blur-[140px]
        opacity-40
        breathe-glow
      " />

      {/* GREEN LIGHT */}

      <div className="
        absolute
        top-[30%]
        right-[-100px]
        w-[420px]
        h-[420px]
        rounded-full
        bg-[#dce9d0]
        blur-[120px]
        opacity-40
        float-slow
      " />

      {/* PINK LIGHT */}

      <div className="
        absolute
        bottom-[0]
        left-[30%]
        w-[340px]
        h-[340px]
        rounded-full
        bg-[#f8d8e2]
        blur-[120px]
        opacity-40
        droplet
      " />

      {/* FLOATING PARTICLES */}

      <div className="
        absolute
        top-[200px]
        left-[15%]
        w-4
        h-4
        rounded-full
        bg-white/60
        blur-sm
        float-slow
      " />

      <div className="
        absolute
        top-[500px]
        right-[20%]
        w-6
        h-6
        rounded-full
        bg-white/50
        blur-sm
        droplet
      " />

      <div className="
        absolute
        bottom-[300px]
        left-[45%]
        w-3
        h-3
        rounded-full
        bg-white/70
        blur-sm
        float-slow
      " />

    </>

  )
}
    {/* WATER REFLECTION */}

    <div className="
    absolute
    inset-0
    opacity-[0.08]
    pointer-events-none
    ">

    <div className="
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)]
    animate-pulse
    " />

</div>