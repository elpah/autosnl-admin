import { connectToDatabase } from "../config/db.js";
import randomUUID from "crypto";

const addNewDealer = async (dealerData) => {
  try {
    const newDealer = { dealerId: randomUUID(), ...dealerData };
    const db = await connectToDatabase();
    const col = db.collection("dealers");
    await col.insertOne(newDealer);
    return newDealer;
  } catch (err) {
    console.log(err);
  }
};

export { addNewDealer };
