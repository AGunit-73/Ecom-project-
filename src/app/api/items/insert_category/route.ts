import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Insert test data into categories table
    await sql`
      INSERT INTO categories (name) 
      VALUES 
        ('Cloth for Men'), 
        ('Cloth for Women'), 
        ('Electronics'), 
        ('Home'), 
        ('Toys'), 
        ('Books'), 
        ('Others')
      ON CONFLICT DO NOTHING; -- Prevent duplicate entries
    `;

    return NextResponse.json({ message: "Test categories inserted successfully" }, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Error inserting test categories:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
