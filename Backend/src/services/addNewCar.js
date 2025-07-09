import { connectToDatabase } from "../config/db.js";
import randomUUID from "crypto";

const addNewCar = async (carData) => {
  try {
    const newCar = { carId: randomUUID(), ...carData };
    const db = await connectToDatabase();
    const col = db.collection("cars");
    await col.insertOne(newCar);
    return newCar;
  } catch (err) {
    console.log(err);
  }
};

export { addNewCar };
