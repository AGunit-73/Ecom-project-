import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const itemsTable = await sql`SELECT * FROM information_schema.tables WHERE table_name = 'items';`;
    const categoriesTable = await sql`SELECT * FROM information_schema.tables WHERE table_name = 'categories';`;

    // Return the result of the table check
    return NextResponse.json({
      itemsTable: itemsTable.rows, // Access the rows from the result
      categoriesTable: categoriesTable.rows,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching table info:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
