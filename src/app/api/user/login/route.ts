import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';
import { createSessionToken } from '@/app/utils/session'; // Import session token utility
import { serialize } from 'cookie'; // To handle cookies

export async function POST(request: Request) {
  try {
    const { usernameOrEmail, password } = await request.json();
    console.log('Received login data:', { usernameOrEmail, password });

    const result = await ApiService.authenticateUser(usernameOrEmail, password);

    if (result.success && result.user) { // Ensure result.user is defined
      // Generate a session token (could be a JWT or random token)
      const sessionToken = createSessionToken(result.user); // Pass user data to the session token creator

      // Set the session token as a cookie in the response
      const response = NextResponse.json(
        { success: true, message: result.message, user: result.user },
        { status: 200 }
      );

      // Set the cookie with sessionToken (adjust options as needed)
      response.headers.set('Set-Cookie', serialize('sessionToken', sessionToken, {
        httpOnly: true, // Ensures the cookie is only accessible by the server
        secure: process.env.NODE_ENV === 'production', // Cookie is only sent over HTTPS in production
        sameSite: 'strict', // Prevent CSRF attacks
        path: '/', // Cookie available throughout the website
        maxAge: 60 * 60 * 24 * 7, // Set the cookie to last for 7 days
      }));

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
