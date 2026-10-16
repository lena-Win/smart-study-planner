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
    <html 
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      >
      <body className="min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem("study-zen-theme");
                const theme = ["morning", "sunset", "night"].includes(saved)
                  ? saved
                  : "morning";
                document.documentElement.dataset.theme = theme;
                document.documentElement.classList.add("theme-" + theme);
              } catch {
                document.documentElement.dataset.theme = "morning";
                document.documentElement.classList.add("theme-morning");
              }
            `,
            }}
          />
        <ThemeProvider>
          <MoodProvider>
            {children}
          </MoodProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
