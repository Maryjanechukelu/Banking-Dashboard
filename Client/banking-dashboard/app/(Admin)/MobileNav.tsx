"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { adminsidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Footer from "@/components/Footer"

declare interface MobileNavProps {
  user: User;
}

declare type User = {
  user: string;
  email: string;
  username: string;
  password: string;
  name: string;
  null: string;

 
};

const MobileNav: React.FC = () => {
  const pathname = usePathname()

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/adminDashboard"
            className="cursor-pointer flex items-center gap-1 px-4"
          >
            <Image
              src="/logo.svg"
              width={34}
              height={34}
              alt="Ultra logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              SwissUltra
            </h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {adminsidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`)

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn("mobilenav-sheet_close w-full", "hover:bg-gray-200", {
                          "bg-indigo-900": isActive,
                        })}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className={cn({
                            "brightness-[3] invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  )
                })}
                USER
              </nav>
            </SheetClose>

            <Footer />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
