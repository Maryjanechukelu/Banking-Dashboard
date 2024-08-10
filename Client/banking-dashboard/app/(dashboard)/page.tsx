import { redirect } from 'next/navigation';

const Page = () => {

    const accessDenied = true
  if (accessDenied) {
    redirect('/login')
  }
  return (
    <div>page</div>
  )
}

export default Page
