"use client"
import React, { useEffect, useState } from "react"
import HeaderBox from "@/components/HeaderBox"
import RightSidebar from "@/components/RightSidebar"
import TotalBalanceBox from "@/components/TotalBalanceBox"

declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface User  {
  username: string
  password: string
  email: string
}

interface LoggedInUser {
  username: string
  password: string
  email: string
  accountNumber: string
  User: string
  null: string
}

const Home: React.FC = () => {
  // const currentPage = Number(page as string) || 1
  const [loggedIn, setLoggedIn] = useState<LoggedInUser | User>()

  // Simulate fetching logged-in user data
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch("/api/getLoggedInUser") // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        const userData = await response.json()
        setLoggedIn(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchLoggedInUser()
  }, [])

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.username || "Guest"}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox />
        </header>
      </div>

      <RightSidebar user={loggedIn} />
    </section>
  )
}

export default Home
