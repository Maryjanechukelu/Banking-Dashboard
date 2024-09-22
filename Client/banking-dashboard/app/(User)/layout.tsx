"use client"

import MobileNav from "@/components/MobileNav"
import Sidebar from "@/components/MainSidebar"
import Footer from "@/components/FooterLayout"
import Image from "next/image"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex h-screen w-full font-inter">
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-grow flex flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
            <div>
              <MobileNav />
            </div>
          </div>

          {/* Children components and content */}
          <div className="flex-grow">{children}</div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  )
}
