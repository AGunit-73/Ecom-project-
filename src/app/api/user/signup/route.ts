import { NextResponse } from "next/server";
import ApiService from "@/app/api_service/index";

// Function to ensure the users table is created
async function ensureUsersTableExists() {
  const res = await fetch("http://localhost:3000/api/user/create_table", {
    method: "GET",
  });
  const data = await res.json();

  if (!data.message.includes("created successfully")) {
    throw new Error("Failed to ensure the 'users' table exists.");
  }

  console.log("Users table ensured to exist:", data.message);
}

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Ensure that the 'users' table exists before proceeding with the registration
    await ensureUsersTableExists();

    const result = await ApiService.registerUser(username, email, password);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
