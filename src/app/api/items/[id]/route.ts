import { NextResponse } from 'next/server';
import { sql } from "@vercel/postgres";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  
  console.log("API request received for item ID:", id); // Log incoming request with item ID

  try {
    const result = await sql`SELECT * FROM items WHERE id = ${id}`;

    console.log("Database query result:", result); // Log the database result

    if (result.rows.length === 0) {
      console.warn("No item found for ID:", id); // Log if no item is found
      return NextResponse.json({ success: false, message: 'Item not found' }, { status: 404 });
    }

    const item = result.rows[0];
    console.log("Item found:", item); // Log the item found
    return NextResponse.json({ success: true, item }, { status: 200 });
  } catch (error) {
    console.error('Error fetching item:', error); // Log error if something went wrong
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
