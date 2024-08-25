import BankCard from "@/components/BankCard"
import HeaderBox from "@/components/HeaderBox"
// import { getAccounts } from "@/lib/actions/bank.actions"
// import { getLoggedInUser } from "@/lib/actions/user.actions"
import React from "react"

const MyBanks = async () => {
//   const loggedIn = null;
  const loggedIn: { firstName?: string, email?: string } = {};
  interface Account {
    totalBanks: number;
    totalCurrentBalance: number;
  }

  const accounts: Account = {
    totalBanks: 0,
      totalCurrentBalance: 0,
   
  };

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={accounts.id}
                  account={a}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks
