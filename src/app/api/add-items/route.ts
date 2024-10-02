import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const price = searchParams.get('price');
  const description = searchParams.get('description');
  const vendor = searchParams.get('vendor');
  const image_url = searchParams.get('image_url') || 'https://example.com/default.jpg'; // default image if not provided

  if (!name || !price || !description || !vendor) {
    return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO items (name, price, description, vendor, image_url)
      VALUES (${name}, ${price}, ${description}, ${vendor}, ${image_url});
    `;

    // Fetch all items after insertion as a response
    const result = await sql`SELECT * FROM items;`;

    return NextResponse.json({ success: true, message: 'Item added successfully', items: result.rows }, { status: 200 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ success: false, message: 'Error adding item' }, { status: 500 });
  }
}
