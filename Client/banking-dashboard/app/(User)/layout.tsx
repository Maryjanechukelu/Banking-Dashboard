import MobileNav from "@/components/MobileNav"
import Sidebar from "@/components/MainSidebar"
import Image from "next/image"



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
