import "dotenv/config";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MongoDB URI is not defined in .env file");
}
const client = new MongoClient(uri);
export default client;
