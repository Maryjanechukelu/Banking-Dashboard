import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type RightSidebarProps = {
  user?: {
    username: string
    email: string
  }
}

const RightSidebar = ({ user }: RightSidebarProps) => {
  if (!user) {
    return <div>No user data available</div> // Or some other fallback UI
  }

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8 ">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>BT</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href="/login">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
      </section>

      <section className="user-actions px-4">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/adminDashboard" className="flex gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {/* Placeholder content since banks prop is removed */}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top categories</h2>
          <p>No categories available</p>
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar
