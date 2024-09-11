"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"
import useAuth from "@/useAuth"

interface Notification {
  message: string
  timestamp: string
}

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}

const NotificationsPage: React.FC = () => {
  useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      try {
        const accessToken = getToken()

        const response = await fetch(
          "https://swiss-ultra-api-2.onrender.com/auth/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // Use the retrieved token
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch notifications. Please try again.")
        }

        const data = await response.json()

        // If a new token is provided in the response, store it
        if (data.access_token) {
          storeToken(data.access_token)
        }

        setNotifications(data)
        // toast.success("Successful")
      } catch (error) {
        toast.error(`Error fetching notifications: ${(error as Error).message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
           <Loader className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-sm rounded-md border border-gray-200"
              >
                <p className="text-sm font-medium text-gray-800">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notifications found</p>
          )}
        </div>
      )}
    </>
  )
}

export default NotificationsPage
