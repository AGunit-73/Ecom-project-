import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index';

export async function GET() {
  try {
    // Fetch all items using the API service
    const result = await ApiService.fetchItems();

    console.log("Fetch result:", result);

    // Check and return the result
    if (result.success) {
      return NextResponse.json({ success: true, items: result.items }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
