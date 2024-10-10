import { NextResponse } from "next/server";
import ApiService from "@/app/api_service/index";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

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
