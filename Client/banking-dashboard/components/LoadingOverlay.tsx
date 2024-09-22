// components/LoadingOverlay.tsx

import React from "react"

interface LoadingOverlayProps {
  isLoading: boolean // Control visibility of the overlay
  message?: string // Optional loading message
  icon?: React.ReactNode // Optional loader icon
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = "Loading...",
  icon,
}) => {
  if (!isLoading) return null // Return nothing if not loading

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {icon}
        <div className="text-white text-2xl mt-2">{message}</div>
      </div>
    </div>
  )
}

export default LoadingOverlay
