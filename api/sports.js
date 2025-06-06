import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

export default async function handler(req, res) {
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