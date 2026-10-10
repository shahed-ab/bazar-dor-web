import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';
import { NextRequest, NextResponse } from 'next/server';

const handlers = toNextJsHandler(auth);

export const GET = async (req: NextRequest) => {
  try {
    return await handlers.GET(req);
  } catch (err: unknown) {
    console.error('[Auth Error GET]', err);
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : 'Authentication internal error',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    return await handlers.POST(req);
  } catch (err: unknown) {
    console.error('[Auth Error POST]', err);
    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : 'Authentication internal error',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 }
    );
  }
};
