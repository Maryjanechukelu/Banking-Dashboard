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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal content */}
      <div className="bg-indigo-600 rounded-lg px-12 py-10 shadow-lg w-full max-w-4xl mx-auto relative">
        <div className="px-6">
          <h1 className="text-lg font-bold p-4 mt-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200 uppercase flex justify-center">
            Please fill in the form to get in touch 
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
              placeholder="Enter your name"
              className="text-gray-900"
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
              className="text-gray-900"
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
              className="text-gray-900"
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
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-900"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
        <Button onClick={closeModal} className="mt-4 bg-indigo-950 text-white">
          Close
        </Button>
      </div>
    </div>
  )
}

export default CustomerSupportForm
