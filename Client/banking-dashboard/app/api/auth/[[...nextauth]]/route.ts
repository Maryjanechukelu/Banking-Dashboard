import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // Add your credentials provider
    }),
  ],
  // Add more configurations as needed
});
