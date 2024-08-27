import HeaderBox from '@/components/HeaderBox'
import RightSidebar from "./../RightSidebar";
import TotalBalanceBox from '@/components/TotalBalanceBox';


declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type User = {
  user: string
  email: string
  firstName: string
  lastName: string
  name: string
  null: string
}
  
const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn: User = {
    firstName: '', email: '',
    user: '',
    lastName: '',
    name: '',
    null: ''
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
          <TotalBalanceBox />
        </header>

       
      </div>

      <RightSidebar 
        user={loggedIn}
      />
    </section>
  )
}

export default Home