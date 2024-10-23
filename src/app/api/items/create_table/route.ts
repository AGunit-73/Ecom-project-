import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if 'categories' table exists
    const categoriesExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'categories'
      );
    `;

    if (!categoriesExists.rows[0].exists) {
      // Create 'categories' table
      await sql`
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL
        );
      `;
      console.log("Categories table created successfully.");
    }

    // Check if 'items' table exists
    const itemsExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'items'
      );
    `;

    if (!itemsExists.rows[0].exists) {
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
      console.log("Items table created successfully.");
    }

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Error creating tables:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
