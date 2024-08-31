"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import BackButton from '@/components/backButton';

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
        const response = await fetch(
          "http://127.0.0.1:5000/auth/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer your_jwt_token`, // Replace with actual token handling
            },
          }
        )

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
       <div className="flex justify-between p-4">
        <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
        Notification
      </h1>
      </div>
      <div>
        <BackButton text='Go Back' link='/Settings' />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
         <Image
            src="/logo.svg" // Replace with your logo path
            alt="Logo"
            width={20}
            height={20}
            className="w-24 h-24 animate-pulse"
          />
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
