import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // SQL statement to create the 'users' table.
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;

    return NextResponse.json(
      { message: "Users table created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating users table:", error);
    return NextResponse.json(
      { error: "Error creating users table" },
      { status: 500 }
    );
  }
}