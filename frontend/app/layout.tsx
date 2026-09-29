import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "@/components/theme/ThemeContext"
import { MoodProvider } from "@/components/theme/MoodContext"

export const metadata: Metadata = {
  title: "Study Zen",
  description: "A calmer way to study.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider>
          <MoodProvider>
            {children}
          </MoodProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
