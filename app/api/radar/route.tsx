// GET - getting data
// POST - creating data
// PUT - updating data

//This file needs to create a child process to run the radar_script.py file

import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

export function GET(request: NextRequest) {
  return NextResponse.json(["Hello World!"]);
}
