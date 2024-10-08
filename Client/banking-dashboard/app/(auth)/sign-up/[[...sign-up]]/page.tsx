import Link from "next/link"
import Image from "next/image"
import { SignupForm } from "./form"

const SignUp = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold text-indigo-900">Welcome</h1>
          <p className="text-gray-400 "> Create account or Log in to get back to your dashboard</p>
        </div>
        <div className="sm:shadow-xl px-8 pb-8 pt-12 mt-5 sm:bg-white rounded-xl space-y-12">
          <h1 className="font-semibold text-2xl">Create an Account</h1>
          <SignupForm />
          <p className="text-center">
            Already have an account?{" "}
            <Link className="text-indigo-500 hover:underline" href="/sign-in">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="h-full bg-indigo-900 hidden lg:flex justify-center items-center ">
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

export default SignUp
