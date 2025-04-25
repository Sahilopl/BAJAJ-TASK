import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/ui/navbar"

export const metadata: Metadata = {
  title: "Doctor Listing",
  description: "Search and book top doctors for video and in-clinic consultations.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Blue Top Bar */}
        <Navbar />

        {/* Page Content */}
        <main className="pt-20 px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
