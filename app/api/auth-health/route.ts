import { NextResponse } from 'next/server';
import client from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const envCheck = {
    hasMongoUri: !!process.env.MONGODB_URI,
    hasBetterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    hasBetterAuthUrl: !!process.env.BETTER_AUTH_URL,
    betterAuthUrl: process.env.BETTER_AUTH_URL || null,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasGithubClientId: !!process.env.GITHUB_CLIENT_ID,
    hasGithubClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
    nodeEnv: process.env.NODE_ENV,
  };

  let dbStatus = 'untested';
  let dbError: string | null = null;

  try {
    await client.db('bazardor').command({ ping: 1 });
    dbStatus = 'connected';
  } catch (err: unknown) {
    dbStatus = 'failed';
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    status: dbStatus === 'connected' ? 'ok' : 'degraded',
    environment: envCheck,
    database: {
      status: dbStatus,
      error: dbError,
    },
    timestamp: new Date().toISOString(),
  });
}
