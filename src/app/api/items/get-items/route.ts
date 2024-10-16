import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Query to fetch all items from the items table
    const { rows } = await sql`
      SELECT * FROM items;
    `;

    console.log("Fetched Items:", rows); // Log items to the terminal

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching items:", error); // Log error to terminal

    return NextResponse.json(
      { error: "Error fetching items" },
      { status: 500 }
    );
  }
}
