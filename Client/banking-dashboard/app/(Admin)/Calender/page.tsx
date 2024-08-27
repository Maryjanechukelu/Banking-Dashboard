"use client"

import React, { useState } from "react"
import { Calendar as CalendarUI } from "@/components/ui/calendar" // Importing with alias to avoid conflict

const CalendarComponent: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="calendar-container p-4 max-w-full sm:max-w-lg mx-auto ">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center text-indigo-900 ">
        Select a Date
      </h1>
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
  )
}

export default CalendarComponent
