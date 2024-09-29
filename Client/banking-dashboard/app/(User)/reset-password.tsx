import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');
  const router = useRouter(); 

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault()
     setLoading(true)

     // Password validation
     if (newPassword !== confirmPassword) {
       setError("Passwords do not match")
       return
     }

     try {
       const response = await fetch(
         `https://swiss-ultra-api-2.onrender.com/auth/reset_password/${token}`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ new_password: newPassword }),
         }
       )

       const data = await response.json()

       if (response.ok) {
         setMessage(data.message)
         setError("")

         // Redirect to login page after 2 seconds
         setTimeout(() => {
           router.push("/login") // Redirect to the login page
         }, 2000)
       } else {
         setError(data.error || "An error occurred")
       }
     } catch (err) {
       setError("An error occurred")
     } finally {
       setLoading(false)
     }
   }

  return (
    <div className="reset-password-form">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="password"
            required
            placeholder="New Password"
          />
        </div>
        <div>
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmpassword"
            required
            placeholder="Confirm Password"
          />
        </div>
       <Button
            type="submit"
            className="w-full bg-indigo-900"
            disabled={loading}
          >
            {loading ? "Reset..." : "Reset Password"}
          </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
