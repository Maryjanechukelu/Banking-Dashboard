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

// Define the Account interface as per your backend response
interface Account {
  data: string
  username: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

type RightSidebarProps = {
  user?: {
    username: string
    email: string
  }
}

const getToken = () => {
  return localStorage.getItem("access_token")
}

const RightSidebar = ({ user }: RightSidebarProps) => {
  const [account, setAccount] = useState<Account | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accessToken = getToken()

        if (!accessToken) {
          throw new Error("No access token available. Please log in.")
        }

        const response = await fetch("http://127.0.0.1:5000/auth/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.ok) {
          console.error("Response status:", response.status)
          const errorDetails = await response.json()
          console.error("Error details:", errorDetails)

          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.")
          }

          throw new Error(
            errorDetails.message ||
              "Failed to fetch account details. Please try again."
          )
        }

        const data: Account = await response.json()
        setAccount(data)
        toast.success("Account details fetched successfully")
      } catch (error) {
        toast.error(
          `Error fetching account details: ${(error as Error).message}`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAccountDetails()
  }, [])

  // Loading state
  if (loading) {
    return <div>Loading account details...</div>
  }

  // Fallback for missing user data
  if (!user) {
    return <div>No user data available</div>
  }

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8 ">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
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
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{user.username}</h1>
            <p className="profile-email">{user.email}</p>
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

        {/* Display account details */}
        <div className="mt-10 flex flex-1 flex-col gap-6">
          {account ? (
            <>
              <h2 className="header-2">Account Details</h2>
              <p>Account Number: {account.account_number}</p>
              <p>Balance: ${account.account_balance.toFixed(2)}</p>
              <p>
                Last Credited Amount: ${account.last_credited_amount.toFixed(2)}
              </p>
            </>
          ) : (
            <p>No account details available</p>
          )}
        </div>
      </section>
    </aside>
  )
}

export default RightSidebar
