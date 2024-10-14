// src/app/api/user/create_table/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // SQL statement to create the 'users' table
    await sql`
    CREATE TABLE IF NOT EXISTS items (
    ItemID SERIAL PRIMARY KEY,
    VendorID INT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price VARCHAR(255) NOT NULL,
    Category VARCHAR(255),
    StockQuantity INT DEFAULT 0,
    CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);`;

    console.log("Customer table created successfully");
    return NextResponse.json(
      { message: "Customer table created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating users table:', error);
    return NextResponse.json(
      { error: "Error creating users table" },
      { status: 500 }
    );
  }
}
