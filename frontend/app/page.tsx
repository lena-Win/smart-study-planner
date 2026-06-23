import Hero from "../components/sections/Hero"
import MoodCard from "../components/ui/MoodCard"
import DashboardShell from "../components/dashboard/DashboardShell"
import AmbientBackground from "../components/ui/AmbientBackground"
import CursorGlow from "@/components/ui/CursorGlow"
export default function HomePage() {

  return (

    <main
      className="
        min-h-screen
        relative
        overflow-hidden
        bg-[#f8f3eb]
      "
    >
      <AmbientBackground />
      <CursorGlow />
      {/* FLOATING BLOBS */}

      <div className="
        absolute
        top-[120px]
        left-[80px]
        w-[220px]
        h-[220px]
        rounded-full
        bg-[#dfead4]
        blur-[80px]
        opacity-60
        float-slow
      " />

      <div className="
        absolute
        top-[500px]
        right-[100px]
        w-[260px]
        h-[260px]
        rounded-full
        bg-[#f6d3db]
        blur-[100px]
        opacity-50
        float-slow
      " />

      <div className="
        absolute
        bottom-[120px]
        left-[40%]
        w-[180px]
        h-[180px]
        rounded-full
        bg-[#dce5f2]
        blur-[90px]
        opacity-50
        droplet
      " />

      {/* NAVBAR */}

      <nav
        className="
          max-w-[1600px]
          mx-auto
          px-8
          py-8
          flex
          justify-between
          items-center
          relative
          z-20
        "
      >

        <h1 className="text-3xl text-[#2d2d2d]">
          Study Zen
        </h1>

        <div className="flex gap-4 items-center">

          <button className="text-[#5e5a54]">
            Login
          </button>

          <button
            className="
              glass
              px-5
              py-2
              rounded-full
            "
          >
            Morning mood
          </button>

        </div>

      </nav>

      {/* HERO */}

      <Hero />

      {/* MOODS */}

      <section
        className="
        section-spacing
        app-container
        "
      >

        <div
          className="
            flex
            justify-between
            items-end
            mb-10
          "
        >

          <div>

            <p
              className="
                uppercase
                tracking-[0.3em]
                text-sm
                text-[#7c8b68]
                mb-4
              "
            >
              Choose your energy
            </p>

            <h2
              className="
                text-5xl
                text-[#2d2d2d]
              "
            >
              Mood Spaces
            </h2>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          <MoodCard
            emoji="🦢"
            title="Calm"
            subtitle="Soft flow, deep breath, clarity."
            color="#dbe9d0"
          />

          <MoodCard
            emoji="🐈"
            title="Focus"
            subtitle="Quiet concentration and deep work."
            color="#d7dff1"
          />

          <MoodCard
            emoji="🦋"
            title="Dreamy"
            subtitle="Gentle pace and reflective energy."
            color="#f6d3db"
          />

          <MoodCard
            emoji="🦌"
            title="Reset"
            subtitle="Slow mornings and nervous system care."
            color="#e9dcc8"
          />

        </div>

      </section>
      {/* <DashboardShell /> */}
    </main>
  )
}