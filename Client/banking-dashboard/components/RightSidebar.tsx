"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Notification from "@/components/Notification"
import { Loader } from "lucide-react"

const RightSidebar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <aside className="right-sidebar w-full max-w-sm bg-white p-6 shadow-lg rounded-lg">
      <section className="flex flex-col pb-8 items-center">
        <div className="profile-banner w-full h-24 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-md mb-4" />
        <div className="profile flex flex-col items-center">
          <div className="profile-img mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      <section className="user-actions px-4 mt-6">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">My Account</h2>
          <Link
            href="/RightSidebar"
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <span className="text-sm font-medium">Add Account</span>
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold text-gray-800">History</h2>
              <Notification />
            </div>
          )}
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar
