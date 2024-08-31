"use client"

import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"

interface Notification {
  message: string
  timestamp: string
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer your_jwt_token`, // Replace with actual token handling
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch notifications. Please try again.")
        }

        const data = await response.json()
        setNotifications(data.notifications)
        toast.success("Notifications fetched successfully")
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
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Notifications</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader className="animate-spin text-indigo-900" size={40} />
          <p className="ml-4 text-lg text-indigo-900">Loading...</p>
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
