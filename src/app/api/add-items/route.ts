import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  try {
    // Extract item data from the request body
    const { name, image_url, description, price, vendor } = await request.json();

    // Validate input fields (optional)
    if (!name || !image_url || !price || !vendor) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    // Insert the new item into the items table
    const result = await sql`
      INSERT INTO items (name, image_url, description, price, vendor)
      VALUES (${name}, ${image_url}, ${description}, ${price}, ${vendor})
    `;

    // Return success response
    return NextResponse.json({ success: true, message: 'Item added successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while adding the item.' }, { status: 500 });
  }
}
