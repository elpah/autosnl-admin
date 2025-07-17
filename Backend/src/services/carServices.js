import client from "../config/client.js";

import { connectToDatabase } from "../config/db.js";
import { randomUUID } from "crypto";

const addNewCar = async (carData) => {
  try {
    const newCar = {
      carId: randomUUID(),
      createdAt: new Date(),
      ...carData,
    };
    const db = await connectToDatabase();
    const carsCollection = db.collection("cars");

    const result = await carsCollection.insertOne(newCar);
    if (!result.acknowledged) {
      throw new Error("Failed to insert new car");
    }

    return newCar.carId;
  } catch (err) {
    console.error("Error in addNewCar:", err.message);
    return null;
  }
};

const getAllCars = async (page = 1, type) => {
  const limit = 30;
  const db = await connectToDatabase();
  const carCol = db.collection("cars");
  const dealerCol = db.collection("dealers");
  const deletedCol = db.collection("deletedCars");

  const skip = (page - 1) * limit;
  let cars;
  let totalCars;

  const projection = {
    _id: 0,
    carId: 1,
    carImages: 1,
    "lang.en.carBrand": 1,
    "lang.en.carModel": 1,
    dealer: 1,
    isRecommended: 1,
    price_incl_btw: 1,
  };

  if (type === "available") {
    totalCars = await carCol.countDocuments();
    cars = await carCol
      .find({}, { projection })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }
  if (type === "deleted") {
    totalCars = await deletedCol.countDocuments();
    cars = await deletedCol
      .find({}, { projection })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }
  const dealerIds = [...new Set(cars.map((car) => car.dealer).filter(Boolean))];

  const dealers = await dealerCol
    .find({ dealerId: { $in: dealerIds } })
    .project({ dealerId: 1, dealerName: 1 })
    .toArray();

  const dealerMap = Object.fromEntries(
    dealers.map((dealer) => [dealer.dealerId, dealer.dealerName])
  );

  const updatedCars = cars.map((car) => ({
    ...car,
    carImages: [car.carImages[0]],
    dealer: dealerMap[car.dealer] || null,
  }));

  return { totalCars, cars: updatedCars };
};

const getCarById = async (carId) => {
  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const dealerCol = db.collection("dealers");

    const car = await carCol.findOne(
      { carId: carId },
      { projection: { _id: 0 } }
    );

    if (car && car.dealer) {
      const dealerInfo = await dealerCol.findOne(
        { dealerId: car.dealer },
        {
          projection: {
            dealerName: 1,
            dealerEmail: 1,
            dealerAddress: 1,
            dealerPhone: 1,
            _id: 0,
          },
        }
      );
      car.dealer = dealerInfo;
    }
    return car;
  } catch (err) {
    console.error("Error in getCarById:", err.message);
    return null;
  }
};

const deleteCarById = async (carId) => {
  const session = client.startSession();

  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const dealerCol = db.collection("dealers");
    const deletedCol = db.collection("deletedCars");
    const homeCol = db.collection("homeSections");

    await session.withTransaction(async () => {
      const car = await carCol.findOne(
        { carId },
        { projection: { _id: 0 }, session }
      );
      if (!car) {
        throw new Error("Failed to retrieve car for deletion");
      }

      const insertToDelete = await deletedCol.insertOne(car, { session });
      if (!insertToDelete.acknowledged) {
        throw new Error("Failed to add deleted car to trash");
      }

      await homeCol.updateOne(
        { type: "homeSections" },
        {
          $pull: {
            recommended: carId,
            trusted: carId,
            damaged: carId,
          },
        },
        { session }
      );

      if (car.dealer) {
        await dealerCol.updateOne(
          { dealerId: car.dealer },
          { $pull: { cars: carId } },
          { session }
        );
      }

      await carCol.deleteOne({ carId }, { session });
    });

    return { success: true, message: "Car deleted successfully." };
  } catch (err) {
    console.error("Error deleting car:", err.message);
    return { success: false, message: err.message };
  } finally {
    await session.endSession();
  }
};

const recommendCarById = async (carId) => {
  const session = client.startSession();
  let updatedIsRecommended;
  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const homeCol = db.collection("homeSections");

    await session.withTransaction(async () => {
      const car = await carCol.findOne({ carId: carId });
      if (!car) {
        throw new Error("Car not found.");
      }

      updatedIsRecommended = !car.isRecommended;

      await carCol.updateOne(
        { carId: carId },
        { $set: { isRecommended: updatedIsRecommended } },
        { session }
      );

      const updateQuery = updatedIsRecommended
        ? { $addToSet: { recommended: carId } }
        : { $pull: { recommended: carId } };

      const updateResult = await homeCol.updateOne(
        { type: "homeSections" },
        updateQuery,
        { session }
      );
      if (updateResult.modifiedCount === 0) {
        throw new Error("homeSections document not found.");
      }
    });

    return {
      success: true,
      message: `Car is now ${
        updatedIsRecommended ? "recommended" : "unrecommended"
      }.`,
    };
  } catch (err) {
    console.error("Error recommending car:", err.message);
    return { success: false, message: err.message };
  } finally {
    await session.endSession();
  }
};

const restoreCar = async (carId) => {
  const session = client.startSession();

  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const dealerCol = db.collection("dealers");
    const deletedCol = db.collection("deletedCars");

    await session.withTransaction(async () => {
      const car = await deletedCol.findOne(
        { carId },
        { projection: { _id: 0 }, session }
      );
      if (!car) {
        throw new Error("Failed to retrieve car for restoration");
      }

      const insertToRestore = await carCol.insertOne(car, { session });
      if (!insertToRestore.acknowledged) {
        throw new Error("Failed to restore car");
      }

      if (car.dealer) {
        await dealerCol.updateOne(
          { dealerId: car.dealer },
          { $addToSet: { cars: carId } },
          { session }
        );
      }
      await deletedCol.deleteOne({ carId }, { session });
    });

    return { success: true, message: "Car restored successfully." };
  } catch (err) {
    console.error("Error restoring car:", err.message);
    return { success: false, message: err.message };
  } finally {
    await session.endSession();
  }
};

const permanentDeleteCarById = async (carId) => {
  if (!carId) {
    return { success: false, message: "carId is required" };
  }
  try {
    const db = await connectToDatabase();
    const deletedCol = db.collection("deletedCars");

    const result = await deletedCol.deleteOne({ carId });

    if (result.deletedCount === 0) {
      return { success: false, message: "Car not found or already deleted" };
    }

    return { success: true, message: "Car permanently deleted" };
  } catch (err) {
    console.error("Error deleting car permanently:", err.message);
    return { success: false, message: "Internal server error" };
  }
};

export {
  addNewCar,
  getAllCars,
  getCarById,
  deleteCarById,
  recommendCarById,
  restoreCar,
  permanentDeleteCarById,
};
