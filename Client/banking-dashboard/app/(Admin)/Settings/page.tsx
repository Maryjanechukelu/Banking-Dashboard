// components/SettingsNav.tsx
import Link from 'next/link';

const Settings: React.FC = () => {
  return (
    <div className=" bg-white p-6 rounded-lg w-full h-full shadow-md flex">
      <ul className="space-y-4">
        <li>
          <Link href="/settings/view-users">
            <div className="text-lg font-semibold text-indigo-900 hover:underline">
              View Users
            </div>
          </Link>
        </li>
        <li>
          <Link href="/settings/credit-users">
            <div className="text-lg font-semibold text-indigo-900  hover:underline">
              Credit Users
            </div>
          </Link>
        </li>
        <li>
          <Link href="/settings/debit-user">
            <div className="text-lg font-semibold text-indigo-900  hover:underline">
              Debit User
            </div>
          </Link>
        </li>
        <li>
          <Link href="/settings/edit-user-data">
            <div className="text-lg font-semibold text-indigo-900  hover:underline">
              Edit User Data
            </div>
          </Link>
        </li>
        <li>
          <Link href="/settings/create-admin-account">
            <div className="text-lg font-semibold text-indigo-900  hover:underline">
              Create Admin Accounts
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
};

export default Settings;
