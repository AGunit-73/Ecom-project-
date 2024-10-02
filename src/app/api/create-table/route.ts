import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  try {
    // SQL statement to create the 'items' table
    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        vendor VARCHAR(255) NOT NULL
      );
    `;

    return NextResponse.json({ message: "Table created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
