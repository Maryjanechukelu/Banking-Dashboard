"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import useAuth from "@/app/useAuth"

interface AccountDetails {
  username: string
  account_number: string
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

const UserAccountsPage: React.FC = () => {
  useAuth()
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAccountDetails = async () => {
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
              Authorization: `Bearer ${accessToken}`, // Replace with actual token handling logic
            },
          }
        )

        if (!response.ok) {
          // Handle 401 unauthorized error separately
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.")
          }
          throw new Error("Failed to fetch account details. Please try again.")
        }

        const data = await response.json()
        // If a new token is provided in the response, store it
        if (data.access_token) {
          storeToken(data.access_token)
        }
        setAccountDetails(data)
        // toast.success("Account details fetched successfully")
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

  return (
    <div className="px-4 w-full pt-6 mt-10 flex justify-center">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Image
            src="/logo.svg" // Replace with your logo path
            alt="Logo"
            width={60}
            height={60}
            className="w-24 h-24 animate-pulse"
          />
        </div>
      ) : accountDetails ? (
        <div className="space-y-4 max-w-lg sm:max-w-xl lg:max-w-2xl w-full mx-auto px-4">
          <h1 className="text-2xl font-bold p-4 text-white mb-4 bg-indigo-900 rounded-lg shadow-lg border border-gray-200 ">
            Hello, {accountDetails.username}
          </h1>
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 space-y-4 max-w-lg sm:max-w-xl lg:max-w-2xl w-full mx-auto">
            <h1 className="text-lg font-semibold text-indigo-900 mb-2">
              {" "}
              Please view your account details below:
            </h1>
            <p className=" mb-2">
              Account Number: {accountDetails.account_number}
            </p>
            <p className="mb-2">
              Account Balance: ${" "}
            {accountDetails?.account_balance != null
              ? parseFloat(
                  accountDetails.account_balance.toString().replace(/,/g, "")
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "Invalid Balance"}
            </p>
            <p className="">
              Last Credited Amount: ${" "}
             {accountDetails?.last_credited_amount != null
              ? parseFloat(
                  accountDetails.last_credited_amount.toString().replace(/,/g, "")
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "Invalid Amount"}
              </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No account details available
        </p>
      )}
    </div>
  )
}

export default UserAccountsPage
