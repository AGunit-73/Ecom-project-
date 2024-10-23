import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create 'categories' table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `;

    // Create the 'items' table with the new structure
    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        seller_id INTEGER REFERENCES users(id), -- Assuming users table exists
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        condition VARCHAR(50) NOT NULL, -- Could be 'new', 'like new', 'used', etc.
        category_id INTEGER REFERENCES categories(id),
        image_urls TEXT[] NOT NULL,
        postal_info TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 });
  } catch (error) {
    // Cast error to Error type to access the 'message' property
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
