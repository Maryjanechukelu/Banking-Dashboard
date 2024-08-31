import Link from "next/link"
import {
  FaUsers,
  FaCreditCard,
  FaUserEdit,
  FaUserPlus,
  FaMoneyBillWave,
} from "react-icons/fa"

const Settings: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg w-full h-full shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/viewUsers">
            <div
              className="flex items-center p-4 bg-gray-100 hover:bg-indigo-100 rounded-lg 
              transition duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              title="View and manage all users in the system"
            >
              <FaUsers className="text-indigo-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                View Users
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/creditUsers">
            <div
              className="flex items-center p-4 bg-gray-100 hover:bg-indigo-100 rounded-lg 
              transition duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              title="Credit users' accounts with funds"
            >
              <FaMoneyBillWave className="text-indigo-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                Credit Users
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/debitUsers">
            <div
              className="flex items-center p-4 bg-gray-100 hover:bg-indigo-100 rounded-lg 
              transition duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              title="Debit users' accounts"
            >
              <FaCreditCard className="text-indigo-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                Debit User
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/editUserData">
            <div
              className="flex items-center p-4 bg-gray-100 hover:bg-indigo-100 rounded-lg 
              transition duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              title="Edit user data"
            >
              <FaUserEdit className="text-indigo-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                Edit User Data
              </span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/createAdmins">
            <div
              className="flex items-center p-4 bg-gray-100 hover:bg-indigo-100 rounded-lg 
              transition duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              title="Create new admin accounts"
            >
              <FaUserPlus className="text-indigo-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                Create Admin Accounts
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Settings
