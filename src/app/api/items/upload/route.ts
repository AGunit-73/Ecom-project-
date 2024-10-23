import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';
import { verifySessionToken } from '@/app/utils/session'; // Function to verify the session token

export async function POST(request: Request) {
  try {
    // Extract the session token from the request cookies
    const sessionToken = request.headers.get('cookie')?.split('sessionToken=')[1];
    
    if (!sessionToken) {
      return NextResponse.json({ success: false, message: 'No session token provided' }, { status: 401 });
    }

    // Verify the session token and get the user
    const user = await verifySessionToken(sessionToken); // Ensure this is async
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired session token' }, { status: 401 });
    }

    // Get the item data from the request body, including multiple image URLs
    const { title, description, price, condition, categoryId, imageUrls, postalInfo } = await request.json();

    // Use the authenticated user's ID as the seller ID
    const result = await ApiService.uploadItem({
      sellerId: user.id, // Extract user ID from the session token
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
