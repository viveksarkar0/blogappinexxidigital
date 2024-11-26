import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';

// Define a custom interface for the User
interface User {
  id: string; // Change id type to string
  username: string;
  email: string;

}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Username or Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined): Promise<User | null> {
        console.log('Credentials received:', credentials);

        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        try {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.identifier },
                { username: credentials.identifier }
              ],
            },
          });

          console.log('User found:', user);

          if (!user) {
            throw new Error('No user found with this email or username');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            // Return user object with id as a string
            return {
              id: user.id.toString(), // Convert id to string
              username: user.username,
              email: user.email,
              // Include accepting messages status
            };
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          console.error('Authorization error:', err);
          throw new Error(err.message || 'An error occurred during authorization');
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // No need to convert here, it's already a string
        // Add isAcceptingMessages to token
        token.username = user.username; // Add username to token
      }
      return token; // Return the modified token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Set user ID
// Set accepting messages status
        session.user.username = token.username; // Set username
      }
      return session; // Return the modified session
    },
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Your secret for NextAuth
  pages: {
    signIn: '/sign-in', // Ensure this points to your custom sign-in page correctly
  },
};
