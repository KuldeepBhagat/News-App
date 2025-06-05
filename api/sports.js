import { readFileSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "sports-data.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

  const option = req.query.option;

  if (!option || !jsonData[option]) {
    return res.status(404).json({ error: "Option not found" });
  }

  res.status(200).json(jsonData[option]);
}
