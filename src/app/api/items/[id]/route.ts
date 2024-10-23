import { NextResponse } from 'next/server';
import ApiService from '@/app/api_service/index'; // Import your ApiService class

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Get the item ID from the params

  console.log("API request received for item ID:", id); // Log the incoming request

  try {
    // Fetch item using ApiService to ensure full item details are fetched (with joins)
    const result = await ApiService.fetchItemById(id); 

    console.log("Database query result:", result); // Log the result

    if (!result.success) {
      console.warn("No item found for ID:", id); // Log if no item found
      return NextResponse.json({ success: false, message: result.message }, { status: 404 });
    }

    console.log("Item found:", result.item); // Log the found item
    return NextResponse.json({ success: true, item: result.item }, { status: 200 });

  } catch (error) {
    console.error('Error fetching item:', error); // Log error if something goes wrong
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
