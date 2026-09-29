"use client"

import type { ReactNode } from "react"

import Sidebar from "@/components/layout/Sidebar"

export default function AppShell({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div
      className="
        app-container
        py-6
        lg:py-8
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[280px_minmax(0,1fr)]
          gap-6
          xl:gap-8
          items-start
        "
      >
        {/* SIDEBAR */}

        <div
          className="
            lg:sticky
            lg:top-8
            lg:h-[calc(100vh-4rem)]
          "
        >
          <Sidebar />
        </div>

        {/* PAGE CONTENT */}

        <div className="min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
}