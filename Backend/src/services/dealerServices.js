import { connectToDatabase } from "../config/db.js";
import { randomUUID } from "crypto";

const getDealers = async () => {
  try {
    const db = await connectToDatabase();
    const col = db.collection("dealers");

    const dealers = await col
      .find(
        {},
        {
          projection: {
            dealerId: 1,
            dealerName: 1,
            dealerEmail: 1,
            dealerPhone: 1,
            dealerAddress: 1,
            _id: 0,
          },
        }
      )
      .toArray();

    return dealers;
  } catch (error) {
    return {};
  }
};

const addNewDealer = async (dealerData) => {
  try {
    if (
      !dealerData.dealerName ||
      !dealerData.dealerAddress ||
      !dealerData.dealerPhone
    ) {
      throw new Error("Missing required dealer information");
    }

    const newDealer = { dealerId: randomUUID(), cars: [], ...dealerData };
    console.log(newDealer);
    const db = await connectToDatabase();
    const col = db.collection("dealers");

    const result = await col.insertOne(newDealer);

    if (!result.acknowledged || !result.insertedId) {
      throw new Error("Failed to insert new dealer");
    }

    return newDealer.dealerId;
  } catch (err) {
    console.error("Error in addNewDealer:", err);
    return { success: false, message: err.message };
  }
};

const addCarIdToDealer = async (carId, dealerId) => {
  if (!carId || !dealerId) {
    console.log("Missing carId or dealerId");
    return false;
  }
  try {
    const db = await connectToDatabase();
    const col = db.collection("dealers");

    const updateResult = await col.updateOne(
      { dealerId: dealerId },
      {
        $push: {
          cars: {
            $each: [carId],
            $position: 0,
          },
        },
      }
    );

    if (!updateResult.modifiedCount) {
      console.warn(
        "Dealer found, but no update was made (maybe carId already exists?)"
      );
    }
    return updateResult.modifiedCount > 0;
  } catch (err) {
    console.error("Error in addCarIdToDealer:", err.message);
    return false;
  }
};

export { getDealers, addNewDealer, addCarIdToDealer };
