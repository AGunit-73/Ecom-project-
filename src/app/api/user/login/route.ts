import ApiService from "@/app/api_service/index";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { usernameOrEmail, password } = await request.json();
  return ApiService.authenticateUser(usernameOrEmail, password);
}
