// /home/liam/tornadoHound/app/api/pythonTest/route.tsx

import { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

function runPythonScript(): Promise<string> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      "./python/radar_script.py",
      "41.6718",
      "72.9493",
    ]);

    let outputData = "";
    pythonProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });

    console.log("outputData: ", outputData);

    pythonProcess.on("close", (code) => {
      console.log(code);
      if (code === 0) {
        resolve(outputData.trim());
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });

    pythonProcess.on("error", (error) => {
      reject(`Error: ${error.message}`);
    });
  });
}

export async function GET(req: Request, res: NextRequest) {
  try {
    const output = await runPythonScript();
    return NextResponse.json({ message: "Python script executed", output });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Python script NOT executed" });
  }
}
