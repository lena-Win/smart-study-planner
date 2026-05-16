type ChromeButtonProps = {
  children: React.ReactNode
}

export default function ChromeButton({
  children
}: ChromeButtonProps) {

  return (

    <button
      className="
        relative
        overflow-hidden
        px-8
        py-4
        rounded-full
        bg-[#93ab74]
        text-white
        shadow-lg
        hover:scale-[1.03]
        transition-all
        duration-300
      "
    >

      <div className="
        absolute
        inset-0
        bg-gradient-to-r
        from-transparent
        via-white/30
        to-transparent
        translate-x-[-200%]
        hover:translate-x-[200%]
        transition-transform
        duration-1000
      " />

      <span className="relative z-10">
        {children}
      </span>

    </button>
  )
}