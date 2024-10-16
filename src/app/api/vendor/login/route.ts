import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Received customer registration data:', { email, password});

    const result = await ApiService.authenticateUser(email, password);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error during customer registration:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
