"use client"

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import Link from "next/link";

const NotificationIcon: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // Fetch notification count
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch("/api/notifications/unread-count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer your_jwt_token`, // Replace with actual token handling
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching unread notifications count:", error);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <Link href="/settings/notifications" className="relative">
      <Bell className="text-gray-600 hover:text-indigo-600" size={24} />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white text-xs">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationIcon;
