import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { FaXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6"
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-100">
      <div className="flex justify-between items-center px-10 py-10">
        <div>
          <Image
            src="/logo.svg"
            alt="Vercel Logo"
            className=""
            width={100}
            height={24}
            priority
          />
        </div>
        <div>
          <Link href="/sign-in">
            <Button className="w-20 bg-blue-700 hover:bg-blue-900" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </div>
      <div className="text-center p-6 pt-20">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-700">
          Welcome to Your Ultimate{" "}
          <span className="text-neutral-600">Banking Dashboard</span>
        </h1>
        <p className="text-xl lg:text-2xl mb-6 self-stretch leading-6 pt-6">
          Take control of your finances with our all-in-one dashboard. Monitor
          your accounts, track your spending, and plan for the future—all from a
          single, secure platform.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 lg:px-36">
          <div className="card-animation bg-white text-left border rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                Real-Time Insights
              </h2>
              <p className="text-base">
                Stay ahead with instant updates on your financial status,
                transactions, and more.
              </p>
            </div>
          </div>
          <div className="card-animation bg-white text-left border rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                Secure Transactions
              </h2>
              <p className="text-base">
                Experience top-notch security with our state-of-the-art
                encryption for all your activities.
              </p>
            </div>
          </div>
          <div className="card-animation bg-white text-left border rounded-lg shadow-md p-6 flex flex-col justify-between cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                Comprehensive Reporting
              </h2>
              <p className="text-base">
                Generate detailed reports to help you plan and make informed
                financial decisions.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Link href="/sign-up">
            <Button
              className="w-[180px] bg-blue-700 hover:bg-blue-900"
              size="lg"
            >
              Get Started
              <MoveRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
      <footer className="bg-neutral-200 py-4 mt-16 pb-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">          
          <div className="flex justify-center text-center md:text-left mb-2 md:mb-0">
            <Image
              src="/logo.svg"
              alt="Vercel Logo"
              className=""
              width={80}
              height={24}
              priority
            />
            <h2 className="text-lg font-semibold">Banking Dashboard</h2>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className=" hover:text-white transition-colors"
              title="Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className=" hover:text-white transition-colors"
              title="Facebook"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className=" hover:text-white transition-colors"
              title="Instagram"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
