import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/generate-image")) {
    const { execSync } = require("child_process");
    const imageString = execSync("python yourscript.py").toString();
    const imageBuffer = Buffer.from(imageString, "base64");

    const response = new NextResponse(imageBuffer);
    response.headers.set("Content-Type", "image/jpeg");
    return response;
  }

  // Handle other routes normally
  return NextResponse.next();
}
