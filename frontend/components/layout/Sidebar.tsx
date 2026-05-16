import {
  LayoutDashboard,
  TimerReset,
  CloudRain,
  BookOpen,
  MoonStar,
  Sparkles
} from "lucide-react"

const items = [
  {
    icon: LayoutDashboard,
    label: "Dashboard"
  },
  {
    icon: TimerReset,
    label: "Focus"
  },
  {
    icon: CloudRain,
    label: "Ambience"
  },
  {
    icon: BookOpen,
    label: "Planner"
  },
  {
    icon: MoonStar,
    label: "Night"
  }
]

export default function Sidebar() {

  return (

    <aside className="
      liquid-glass
      backdrop-blur-3xl
      hover:scale-[1.02]
      transition-all
      duration-500
      w-full
      lg:w-[110px]
      rounded-[40px]
      p-5
      flex
      flex-col
      items-center
      gap-6
      lg:sticky
      lg:top-8
      lg:h-[85vh]
    ">

      {/* LOGO */}

      <div className="
        w-16
        h-16
        rounded-full
        bg-[#f4eee3]
        flex
        items-center
        justify-center
        text-2xl
        soft-shadow
      ">
        ✨
      </div>

      {/* NAV */}

      <div className="
        flex
        flex-col
        gap-4
        mt-6
        group
        hover:translate-x-1
        transition-all
        duration-300
      ">

        {items.map((item, index) => {

          const Icon = item.icon

          return (

            <button
              key={index}
              className="
                group
                relative
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-white/60
                to-white/10
                border
                border-white/30
                shadow-[0_8px_30px_rgba(255,255,255,0.12)]
                backdrop-blur-xl
                group-hover:scale-110
                group-hover:rotate-3
                transition-all
                duration-500
              "
            >
              <Icon
                size={24}
                className="
                  text-[#5f5b53]
                  group-hover:text-black
                  transition
                "
              />

            </button>

          )
        })}

      </div>

      {/* BOTTOM */}

      <div className="mt-auto">

        <div className="
          w-16
          h-16
          rounded-full
          bg-gradient-to-br
          from-[#f7d7de]
          to-[#dce9d0]
          flex
          items-center
          justify-center
          text-2xl
        ">
          🦢
        </div>

      </div>

    </aside>
  )
}