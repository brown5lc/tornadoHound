// Handle creating a child proccess to run the radar script
// and return the results to the client
import { exec } from "child_process";

export default function handler(req, res) {
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
