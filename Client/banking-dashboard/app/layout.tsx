export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
})


export const metadata: Metadata = {
  title: "SwitzUltra",
  description: "Banking with Flex.",
  icons: {
    icon: "/logo.svg",
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ToastContainer />
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <link rel="icon" href="/logo.svg" />
        {children}
      </body>
    </html>
  )
}
