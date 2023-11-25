// GET - getting data
// POST - creating data
// PUT - updating data

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "Liam" },
    { id: 2, name: "Noah" },
    { id: 3, name: "Oliver" },
  ]);
}
