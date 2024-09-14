"use client"
import React, { useEffect, useState, useRef } from "react"
import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import Notification from "@/components/Notification"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { toast } from "react-toastify"
import useAuth from "@/useAuth"

interface Account {
  email: string
  data: string
  username: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

interface User {
  data: string
  username: string
  email: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}

const Home: React.FC = () => {
  useAuth()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [user, setUser] = useState<User>() 
  const hasFetchedData = useRef(false)
 

  useEffect(() => {
    const fetchAccountDetails = async () => {
      // Check if data has already been fetched to prevent multiple fetches
      if (hasFetchedData.current) return
      try {
        const accessToken = getToken()
        if (!accessToken) {
          throw new Error("No access token available. Please log in.")
        }

        const response = await fetch("https://swiss-ultra-api-2.onrender.com/auth/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.")
          }
          throw new Error("Failed to fetch account details. Please try again.")
        }

        const data: Account[] = await response.json()

        // Store the token if provided
        if (data[0]?.data) {
          storeToken(data[0].data)
        }

        setAccounts(data)

        // Map Account data to User data
        if (data.length > 0) {
          const userData: User = {
            data: data[0].data,
            username: data[0].username,
            email: data[0].email,
            account_number: data[0].account_number,
            account_balance: data[0].account_balance,
            last_credited_amount: data[0].last_credited_amount,
          }
          setUser(userData)
        }

        toast.success("Successful")
      } catch (error) {
        toast.error(
          `Error fetching account details: ${(error as Error).message}`
        )
      } finally {
        // Mark data as fetched to prevent multiple toasts
        hasFetchedData.current = true;
      }
    }

    fetchAccountDetails()
  }, [])

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.username}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox />
        </header>
         <Notification />
      </div>

      <RightSidebar />
    </section>
  )
}

export default Home
