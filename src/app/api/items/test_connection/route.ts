import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Execute a simple query to test the connection
        await sql`SELECT 1`;

        // If the query is successful, return a success response
        return NextResponse.json({ success: true, message: "Connection successful!" }, { status: 200 });
    } catch (error) {
        // If there's an error, log it and return a failure response
        console.error("Connection failed:", error);

        // Safely handle the error as an instance of Error
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ success: false, message: "Connection failed: " + errorMessage }, { status: 500 });
    }
}
