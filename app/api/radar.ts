// app/radar.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function handler(req: NextRequest) {
  const url = req.nextUrl;
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  // Perform your logic here
  // ...

  return NextResponse.json({ message: "Radar data response" });
}

/*
import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;

  const scriptPath = "../../python/radar_script.py";

  exec(`python ${scriptPath} ${lat} ${lon}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      res.status(500).send(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      res.status(500).send(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send(stdout);
  });
}
*/
