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

const getAllCars = async (page = 1) => {
  const limit = 30;
  const db = await connectToDatabase();
  const carCol = db.collection("cars");
  const dealerCol = db.collection("dealers");

  const skip = (page - 1) * limit;

  const projection = {
    _id:0,
    carId: 1,
    carImages: 1,
    "lang.en.carBrand": 1,
    "lang.en.carModel": 1,
    dealer: 1,
    price_incl_btw: 1,
  };

  const totalCars = await carCol.countDocuments();
  const cars = await carCol
    .find({}, { projection })
    .skip(skip)
    .limit(limit)
    .toArray();

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

  const updatedCars = cars.map((car) => ({
    ...car,
    carImages:[car.carImages[0]],
    dealer: dealerMap[car.dealer] || null,
  }));

  return { totalCars, cars: updatedCars };
};


const getCarById = async (id) => {
  try {
    const db = await connectToDatabase();
    const carCol = db.collection("cars");
    const dealerCol = db.collection("dealers");


    const car = await carCol.findOne({ carId: id }, { projection :{_id:0}});
    if(car && car.dealer)
    {
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
      car.dealer = dealerInfo
    }

    return car;
  } catch (err) {
    console.error("Error in getCarById:", err.message);
    return null; 
  }
};


export { addNewCar, getAllCars, getCarById };
