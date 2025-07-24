import client from "../../config/client.js";

import { connectToDatabase } from "../../config/db.js";
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in addNewCar:", err.message);
    }
    return null;
  }
};

const getTotalCars = async () => {
  const db = await connectToDatabase();
  const carCol = db.collection("cars");
  const dealerCol = db.collection("dealers");
  const totalCars = await carCol.countDocuments();
  const totalDealers = await dealerCol.countDocuments();

  const totalUsed = await carCol.countDocuments({
    "lang.en.carType": { $regex: /^used$/i },
  });

  const totalDamaged = await carCol.countDocuments({
    "lang.en.carType": { $regex: /^damaged$/i },
  });

  return { totalCars, totalDealers, totalUsed, totalDamaged };
};

const getAllCars = async (params) => {
  const limit = 30;
  const db = await connectToDatabase();
  const carCol = db.collection("cars");
  const dealerCol = db.collection("dealers");
  const deletedCol = db.collection("deletedCars");

  const {
    pageNumber = 1,
    type,
    sortOptions = {},
    carBrand,
    carModel,
    carCategory,
  } = params;

  const skip = (pageNumber - 1) * limit;
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
    "lang.en.carType": 1,
    createdAt: 1,
  };

  let query = {};
  if (carBrand) {
    query["lang.en.carBrand"] = { $regex: new RegExp(`^${carBrand}$`, "i") };
  }
  if (carModel) {
    query["lang.en.carModel"] = { $regex: new RegExp(`^${carModel}$`, "i") };
  }
  if (carCategory) {
    query["lang.en.carType"] = { $regex: new RegExp(`^${carCategory}$`, "i") };
  }

  try {
    if (type === "available") {
      totalCars = await carCol.countDocuments(query);
      cars = await carCol
        .find(query, { projection })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();
    } else if (type === "deleted") {
      totalCars = await deletedCol.countDocuments(query);
      cars = await deletedCol
        .find(query, { projection })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .toArray();
    }

    const dealerIds = [
      ...new Set(cars.map((car) => car.dealer).filter(Boolean)),
    ];
    const dealers = await dealerCol
      .find({ dealerId: { $in: dealerIds } })
      .project({ dealerId: 1, dealerName: 1 })
      .toArray();

    const dealerMap = Object.fromEntries(
      dealers.map((dealer) => [dealer.dealerId, dealer.dealerName])
    );

    cars.forEach((car) => {
      if (
        Array.isArray(car.carImages) &&
        car.carImages.length > 0 &&
        typeof car.carImages[0] === "object" &&
        car.carImages[0] !== null &&
        "url" in car.carImages[0]
      ) {
        let newImages = car.carImages.map((img) => img.url);
        car.carImages = newImages;
      }
    });

    const updatedCars = cars.map((car) => ({
      ...car,
      carImages: [car.carImages[0]],
      dealer: dealerMap[car.dealer] || null,
    }));

    return { totalCars, cars: updatedCars };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getAllCars function:", error);
    }
    throw new Error("Failed to fetch cars. Please try again later.");
  }
};

const getCarById = async (carId) => {
  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const dealerCol = db.collection("dealers");

    let car = await carCol.findOne(
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

      if (
        Array.isArray(car.carImages) &&
        car.carImages.length > 0 &&
        typeof car.carImages[0] === "object" &&
        car.carImages[0] !== null &&
        "url" in car.carImages[0]
      ) {
        let newImages = car.carImages.map((img) => img.url);
        car.carImages = newImages;
      }
    }
    return car;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in getCarById:", err.message);
    }
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting car:", err.message);
    }
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error recommending car:", err.message);
    }
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error restoring car:", err.message);
    }
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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting car permanently:", err.message);
    }
    return { success: false, message: "Internal server error" };
  }
};

export {
  addNewCar,
  getTotalCars,
  getAllCars,
  getCarById,
  deleteCarById,
  recommendCarById,
  restoreCar,
  permanentDeleteCarById,
};
