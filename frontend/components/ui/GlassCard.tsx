type GlassCardProps = {
  children: React.ReactNode
  className?: string
}

export default function GlassCard({
  children,
  className = ""
}: GlassCardProps) {

  return (

    <div
      className={`
        glass
        relative
        overflow-hidden
        rounded-[38px]
        ${className}
      `}
    >

      {/* SHIMMER */}
      <div className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      ">

        <div className="
          absolute
          top-0
          left-[-150%]
          w-[120%]
          h-full
          rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/30
          to-transparent
          animate-shimmer
        " />

      </div>

      <div className="relative z-10">
        {children}
      </div>

    </div>
  )
}