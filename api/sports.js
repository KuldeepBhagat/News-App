import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
<<<<<<< HEAD
  try {
    await client.connect();
    const db = client.db("NewsApp");
    const collection = db.collection("SportsData");
    
    const query = req.query.option;
    const data = await collection.findOne({}, {projection: {[query]: 1, _id: 0}});
    res.status(200).json(data[query]);
  }catch (error) {
    console.error("Error fetching from MongoDB:", error)
    res.status(500).json({error: "Internal Error"})
  }finally {
    await client.close();
  }
}
=======
  const filePath = path.join(process.cwd(), "sports-data.json");
  const jsonData = JSON.parse(readFileSync(filePath, "utf8"));

  const option = req.query.option;

  if (!option || !jsonData[option]) {
    return res.status(404).json({ error: "Option not found" });
  }

  res.status(200).json(jsonData[option]);
}
>>>>>>> e082c7e80ec8a4a3fbc7b5df10f333485d2f09e0
