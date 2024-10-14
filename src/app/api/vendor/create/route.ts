// src/app/api/user/create_table/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // SQL statement to create the 'users' table
    await sql`
    CREATE TABLE IF NOT EXISTS Vendor (
       VendorID SERIAL PRIMARY KEY,
       Name VARCHAR(255) NOT NULL,
       Email VARCHAR(255) NOT NULL UNIQUE,
       Phone VARCHAR(20),
       Address VARCHAR(255),
       Password VARCHAR(255) NOT NULL,  
       CreatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );`;

    console.log("Vendor table created successfully");
    return NextResponse.json(
      { message: "Vendor table created successfully" },
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
