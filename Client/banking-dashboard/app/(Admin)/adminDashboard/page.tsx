import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
// import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
// import { getLoggedInUser } from '@/lib/actions/user.actions';

  
const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn: User = {
    firstName: '', email: '',
    user: '',
    lastName: '',
    name: ''
  }; // Ensure loggedIn is of type User
  interface Accounts {
    totalBanks: number;
    totalCurrentBalance: number;
  }
    interface types {
    user: string,
    bank: string,
}
  const accounts: Accounts = {
    totalBanks: 0,
      totalCurrentBalance: 0,
   
  };
  
  const accountsData: Account[] = [];
    

    const account: Transaction[] = [];

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account}
          page={currentPage}
        />
      </div>

      <RightSidebar 
        user={loggedIn}
      />
    </section>
  )
}

export default Home