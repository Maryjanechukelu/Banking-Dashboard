import Link from "next/link"
import Image from "next/image"
import { SigninForm } from "./form"

const SignIn = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold text-blue-600">Welcome Back</h1>
          <p className="text-gray-400 ">Log in or Create account to get back to your dashboard</p>
        </div>
        <div className="sm:shadow-xl px-8 pb-8 pt-12 mt-5 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Login</h1>
          <SigninForm />
          <p className="text-center">
            Need to create an account?{" "}
            <Link className="text-indigo-500 hover:underline" href="/sign-up">
              Create Account
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="h-full bg-neutral-200 hidden lg:flex justify-center items-center ">
        <Image
          src="/logo.svg"
          alt="Next.js Logo"
          className="flex "
          width={180}
          height={37}
          priority
        />
      </div>
    </div>
  )
}

export default SignIn
