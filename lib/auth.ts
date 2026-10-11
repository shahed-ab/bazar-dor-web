import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { nextCookies } from 'better-auth/next-js';
import client from './mongodb';

const cleanUrl = (url?: string | null) => (url ? url.trim().replace(/\/+$/, '') : '');

const getBaseUrl = () => {
  const envUrl = cleanUrl(process.env.BETTER_AUTH_URL) || cleanUrl(process.env.NEXT_PUBLIC_APP_URL);
  if (envUrl) return envUrl;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${cleanUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${cleanUrl(process.env.VERCEL_URL)}`;
  }
  return process.env.NODE_ENV === 'production'
    ? 'https://bazar-dor-web-two.vercel.app'
    : 'http://localhost:3000';
};

export const auth = betterAuth({
  database: mongodbAdapter(client.db('bazardor')),
  baseURL: getBaseUrl(),
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
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://*.vercel.app',
    'https://bazar-dor-web-two.vercel.app',
    'https://bazar-dor-web-gold.vercel.app',
    ...(process.env.BETTER_AUTH_URL ? [cleanUrl(process.env.BETTER_AUTH_URL)] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [cleanUrl(process.env.NEXT_PUBLIC_APP_URL)] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${cleanUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL)}`]
      : []),
    ...(process.env.VERCEL_URL ? [`https://${cleanUrl(process.env.VERCEL_URL)}`] : []),
  ].filter(Boolean) as string[],
  plugins: [nextCookies()],
});
