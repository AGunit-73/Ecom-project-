import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query the items and categories tables
    const itemsTable = await sql`SELECT * FROM items;`;
    const categoriesTable = await sql`SELECT * FROM categories;`;

    console.log('Items Table:', itemsTable.rows);  // Log the fetched items
    console.log('Categories Table:', categoriesTable.rows);  // Log the fetched categories

    return NextResponse.json({
      itemsTable: itemsTable.rows,
      categoriesTable: categoriesTable.rows,
    });
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching items or categories:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
