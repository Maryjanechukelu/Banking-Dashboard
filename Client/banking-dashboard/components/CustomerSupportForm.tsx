"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

const CustomerSupportForm: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [subject, setSubject] = useState("")
   const [message, setMessage] = useState("")
   const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        "https://swiss-ultra-api-2.onrender.com/auth/send_message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        toast.success(
          data.message || "Your message has been sent successfully!"
        )
        closeModal()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to send message.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Customer Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              required
              placeholder="Enter subject"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              required
              placeholder="Enter your message"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
        <Button onClick={closeModal} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  )
}

export default CustomerSupportForm