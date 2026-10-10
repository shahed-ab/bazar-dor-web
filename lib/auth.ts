import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import client from './mongodb';

export const auth = betterAuth({
  database: mongodbAdapter(client.db('bazardor')),
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:3000',
  secret:
    process.env.BETTER_AUTH_SECRET ||
    'bazardor-secret-key-min-32-characters-safe-development-token',
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ],
  plugins: [nextCookies()],
});
