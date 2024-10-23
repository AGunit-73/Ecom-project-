import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';
import { verifySessionToken } from '@/app/utils/session'; // Ensure the session utility is correctly implemented

export async function POST(request: Request) {
  try {
    // Extract and validate session token
    const cookies = request.headers.get('cookie');
    const sessionToken = cookies?.split(';').find(cookie => cookie.trim().startsWith('sessionToken='));
    
    if (!sessionToken) {
      return NextResponse.json({ success: false, message: 'No session token provided' }, { status: 401 });
    }

    const tokenValue = sessionToken.split('=')[1]; // Get the token value after 'sessionToken='
    
    // Verify session token
    const user = await verifySessionToken(tokenValue);

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired session token' }, { status: 401 });
    }

    // Parse the request body
    const { title, description, price, condition, categoryId, imageUrls, postalInfo } = await request.json();

    if (!title || !description || !price || !condition || !categoryId || !postalInfo || !imageUrls.length) {
      return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
    }

    // Upload item using the API service
    const result = await ApiService.uploadItem({
      sellerId: user.id, // Seller ID from the session
      title,
      description,
      price,
      condition,
      categoryId,
      imageUrls, // Array of image URLs
      postalInfo,
    });

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Item uploaded successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }

  } catch (error) {
    console.error('Error uploading item:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
