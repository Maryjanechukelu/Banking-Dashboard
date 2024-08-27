import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";

import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
//   interface MobileNavProps {
//   user: User;
// }

  type User = {
    user: string;
    email: string;
    firstName: string;
    lastName: string;
    name: string;
  };
  
  // Remove the duplicate declaration of 'loggedIn'
  const loggedIn: User | null = null;

    // const loggedIn = null;
  // if(!loggedIn) redirect('/sign-in')

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
