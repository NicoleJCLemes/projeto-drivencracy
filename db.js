import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongo = new MongoClient(process.env.MONGO_URI);

await mongo.connect();

const db = mongo.db(process.env.DB);

export default db;