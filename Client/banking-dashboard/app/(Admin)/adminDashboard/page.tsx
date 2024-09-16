"use client"
import React, { useEffect, useState, useRef } from "react"
import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "./../RightSidebar"
import Notification from "@/components/Notification"
import TotalBalanceBox from "@/components/TotalBalanceBox"
import { toast } from "react-toastify" 
import "react-toastify/dist/ReactToastify.css"
import useAuth from "@/app/useAuth"

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
  const toastShown = useRef(false) // Ref to track if toast has been shown

  useEffect(() => {
    const fetchAccountDetails = async () => {
      // Prevent multiple fetches
      if (hasFetchedData.current) return
      try {
        const accessToken = getToken()
        if (!accessToken) {
          throw new Error("No access token available. Please log in.")
        }

        const response = await fetch(
          "https://swiss-ultra-api-2.onrender.com/auth/account",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.")
          }
          throw new Error("Failed to fetch account details. Please try again.")
        }

        const data: User = await response.json()

        // Store the token if provided
        if (data?.data) {
          storeToken(data.data)
        }

        setUser(data)

        toast.success("User fetched successfully")
      } catch (error) {
        toast.error(
          `Error fetching account details: ${(error as Error).message}`
        )
      } finally {
        hasFetchedData.current = true
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
