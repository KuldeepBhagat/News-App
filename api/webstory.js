import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db("NewsApp");
    const collection = db.collection(req.query.collection || "Webstories");

    const query = req.query.id ? { id: req.query.id } : {};
    const options = req.query.field
      ? { projection: { [req.query.field]: 1, _id: 0 } }
      : {};

    const data = await collection.findOne(query, options);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}