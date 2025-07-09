import client from "./client.js";

let db;
const connectToDatabase = async () => {
  if (!db) {
    await client.connect();
    const dbName = process.env.DB_NAME;
    db = client.db(dbName);
  }
  return db;
};
export { connectToDatabase };
