import sportsData from "./sports.json" assert { type: "json" };

export default async function handler(req, res) {
    const option = req.query.option;

    if (!option || !sportsData[option]) {
    return res.status(404).json({ error: "Option not found" });
    }

    res.status(200).json(sportsData[option]);
}