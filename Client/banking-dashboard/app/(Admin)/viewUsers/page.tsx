"use client"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"
import BackButton from "@/components/backButton"
import PostsPagination from "@/components/Pagination"
import useAuth from "@/app/useAuth"

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}
interface User {
  id: number
  username: string
  email: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

const ViewUsersPage: React.FC = () => {
  useAuth()
  const [users, setUsers] = useState<User[]>([]) // State to hold user data
  const [loading, setLoading] = useState<boolean>(true) // State to handle loading
  const [currentPage, setCurrentPage] = useState<number>(1) // State to track current page
  const [totalPages, setTotalPages] = useState<number>(1) // State to track total pages

  useEffect(() => {
    // Function to fetch users from the backend with pagination
    const fetchUsers = async (page: number) => {
      setLoading(true)
      try {
        const accessToken = getToken()
        if (!accessToken) {
          throw new Error("No access token available. Please log in.")
        }
        const response = await fetch(
          `https://swiss-ultra-api-2.onrender.com/auth/admin/users?page=${page}`, // Adjust API call for pagination
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch users. Please try again.")
        }

        const data = await response.json() // Parse JSON data
        setUsers(data.users) // Assuming the response includes a 'users' array
        setTotalPages(data.totalPages) // Assuming total pages are provided by the backend
        toast.success("Users fetched successfully")
      } catch (error) {
        toast.error(`Error fetching users: ${(error as Error).message}`)
      } finally {
        setLoading(false) // Stop loading
      }
    }

    fetchUsers(currentPage) // Fetch users when currentPage changes
  }, [currentPage]) // Dependency on currentPage to refetch data on page change

  // Handle page change from pagination component
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
            View Users
          </h1>
        </div>
        <div>
          <BackButton text="Go Back" link="/Settings" />
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader
            className="animate-spin flex justify-center items-center"
            size={20}
          />
        </div>
      ) : (
        <div className="overflow-x-auto px-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">Username</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Account Number</th>
                <th className="py-2 px-4 text-left">Balance</th>
                <th className="py-2 px-4 text-left">Last Credited</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.account_number}</td>
                  <td className="py-2 px-4">${user.account_balance}</td>
                  <td className="py-2 px-4">${user.last_credited_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination Component */}
      <div className="flex justify-center mt-[500px]">
        <PostsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ViewUsersPage
