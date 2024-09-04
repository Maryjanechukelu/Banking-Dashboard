"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "react-toastify"

interface Account {
  data: string
  username: string
  email: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

type RightSidebarProps = {
  user?: Account // Adjusted to use the Account type directly
}

const RightSidebar = ({ user }: RightSidebarProps) => {
  const [account, setAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAccountDetails = async () => {
      console.log("Fetching account details", user) // Log user details
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setAccount(user) // Directly use the passed user data as account details
        toast.success("Account details loaded successfully")
      } catch (error) {
        toast.error(
          `Error loading account details: ${(error as Error).message}`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAccountDetails()
  }, [user]) // Dependencies include user to refresh if user data changes

  if (loading) {
    return <div className="p-4">Loading account details...</div>
  }

  if (!account) {
    console.log("No account details available")
    return <div>No account details available</div>
  }

  return (
    <aside className="right-sidebar bg-white rounded-lg shadow-lg p-4">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
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
                <Link href="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="profile-details">
            <h1 className="profile-name text-lg font-semibold">
              {account.username}
            </h1>
            <p className="profile-email text-sm text-gray-600">
              {account.email}
            </p>
          </div>
        </div>
      </section>

      <section className="user-actions mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Account</h2>
          <Link href="/userDashboard" className="flex items-center gap-2">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <span className="text-sm font-medium text-gray-600">Add Bank</span>
          </Link>
        </div>

        {account ? (
          <div className="flex flex-col gap-2 text-sm text-gray-800">
            <h2 className="font-medium">Account Details</h2>
            <p>Account Number: {account.account_number}</p>
            <p>Balance: ${account.account_balance.toFixed(2)}</p>
            <p>
              Last Credited Amount: ${account.last_credited_amount.toFixed(2)}
            </p>
          </div>
        ) : (
          <p>No account details available</p>
        )}
      </section>
    </aside>
  )
}

export default RightSidebar
