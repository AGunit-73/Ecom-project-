import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/app/utils/session';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Extract session token from cookies
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, message: 'No session token found' },
        { status: 401 }
      );
    }

    // Verify the session token
    const user = verifySessionToken(sessionToken);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid session token' },
        { status: 401 }
      );
    }

    // Return user data
    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
