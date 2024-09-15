"use client"

import React, { useState } from "react"
import { Calendar as CalendarUI } from "@/components/ui/calendar" // Importing with alias to avoid conflict
import BackButton from "@/components/backButton"
import useAuth from "@/app/useAuth"

const CalendarComponent: React.FC = () => {
  useAuth()
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <div className="flex justify-between p-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6  text-indigo-900">
            Select a Date
          </h1>
        </div>
        <div>
          <BackButton text="Go Back" link="/Settings" />
        </div>
      </div>
      <div className="calendar-container p-4 max-w-full sm:max-w-lg mx-auto ">
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
        />
        {date && (
          <p className="mt-4 text-base sm:text-lg text-center text-indigo-900">
            Selected Date:{" "}
            <span className="font-semibold">{date.toDateString()}</span>
          </p>
        )}
      </div>
    </>
  )
}

export default CalendarComponent
