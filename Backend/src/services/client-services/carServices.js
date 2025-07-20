import "dotenv/config.js";
import randomUUID from "crypto";

import { connectToDatabase } from "../../config/db.js";

const createNewCar = async (carData) => {
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
const getCarById = async (id) => {
  try {
    const db = await connectToDatabase();
    const col = db.collection("cars");
    const colDealer = db.collection("dealers");
    let dealer = null;
    const car = await col.findOne({ carId: id });
    if (car) {
      dealer = await colDealer.findOne(
        { dealerId: car.dealer },
        { projection: { cars: 0 } }
      );
    }
    return { car, dealer };
  } catch (error) {
    console.error("Error fetching car and dealer:", error);
    throw new Error("Could not fetch car and dealer data.");
  }
};

const getAllCars = async (page = 1, limit = 20) => {
  const db = await connectToDatabase();
  const col = db.collection("cars");
  const skip = (page - 1) * limit;
  const cars = await col.find({}).skip(skip).limit(limit).toArray();
  return cars;
};

const getCarsWithFilters = async (filters = {}, page = 1, limit = 30) => {
  const db = await connectToDatabase();
  const col = db.collection("cars");
  const skip = (page - 1) * limit;

  const filterMappings = {
    brand: "carBrand",
    model: "carModel",
    fuel: "carFuel",
    transmission: "carTransmission",
    body: "carBody",
    carCountry: "carCountry",
    carType: "carType",
  };

  let queryConditions = Object.entries(filters)
    .filter(([key, value]) => value && filterMappings[key])
    .map(([key, value]) => ({
      [`lang.en.${filterMappings[key]}`]: {
        $regex: new RegExp(value, "i"),
      },
    }));
  const query = queryConditions.length > 0 ? { $and: queryConditions } : {};
  const projection = {
    carId: 1,
    carImages: 1,
    "lang.en.carBrand": 1,
    "lang.nl.carBrand": 1,
    "lang.ua.carBrand": 1,
    "lang.ru.carBrand": 1,
    "lang.en.carModel": 1,
    "lang.nl.carModel": 1,
    "lang.ua.carModel": 1,
    "lang.ru.carModel": 1,
    "lang.en.carFuel": 1,
    "lang.nl.carFuel": 1,
    "lang.ua.carFuel": 1,
    "lang.ru.carFuel": 1,
    price_incl_btw: 1,
    carMileage: 1,
    carERD: 1,
  };
  const totalCars = await col.countDocuments(query);
  const cars = await col
    .find(query, { projection })
    .skip(skip)
    .limit(limit)
    .toArray();

  return { totalCars, cars };
};

const getCarsWithMultiFilters = async (filters = {}, page = 1, limit = 30) => {
  const db = await connectToDatabase();
  const col = db.collection("cars");

  const skip = (page - 1) * limit;

  let query = {};

  if (filters.carType)
    query.lang.en.carType = { $regex: new RegExp(filters.carType, "i") };

  if (filters.brand && filters.brand.length > 0) {
    query["lang.en.carBrand"] = {
      $in: filters.brand.map((b) => new RegExp(b, "i")),
    };
  }
  if (filters.model && filters.model.length > 0) {
    query["lang.en.carModel"] = {
      $in: filters.model.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.fuel && filters.fuel.length > 0) {
    query["lang.en.carFuel"] = {
      $in: filters.fuel.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.transmission && filters.transmission.length > 0) {
    query["lang.en.carTransmission"] = {
      $in: filters.transmission.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.vehicleType && filters.vehicleType.length > 0) {
    query["lang.en.carBody"] = {
      $in: filters.vehicleType.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.country && filters.country.length > 0) {
    query["lang.en.carCountry"] = {
      $in: filters.country.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.priceMin || filters.priceMax) {
    query.price_incl_btw = {};
    if (filters.priceMin) query.price_incl_btw.$gte = filters.priceMin;
    if (filters.priceMax) query.price_incl_btw.$lte = filters.priceMax;
  }

  if (filters.mileageMin || filters.mileageMax) {
    query.carMileage = {};
    if (filters.mileageMin) query.carMileage.$gte = filters.mileageMin;
    if (filters.mileageMax) query.carMileage.$lte = filters.mileageMax;
  }

  if (filters.erdMin || filters.erdMax) {
    query.carERD = {};
    if (filters.erdMin) query.carERD.$gte = filters.erdMin;
    if (filters.erdMax) query.carERD.$lte = filters.erdMax;
  }

  const totalCars = await col.countDocuments(query);

  const projection = {
    carId: 1,
    carImages: 1,
    "lang.en.carBrand": 1,
    "lang.nl.carBrand": 1,
    "lang.ua.carBrand": 1,
    "lang.ru.carBrand": 1,
    "lang.en.carModel": 1,
    "lang.nl.carModel": 1,
    "lang.ua.carModel": 1,
    "lang.ru.carModel": 1,
    "lang.en.carFuel": 1,
    "lang.nl.carFuel": 1,
    "lang.ua.carFuel": 1,
    "lang.ru.carFuel": 1,
    price_incl_btw: 1,
    carMileage: 1,
    carERD: 1,
  };

  const cars = await col
    .find(query, { projection })
    .sort(filters.sortOptions)
    .skip(skip)
    .limit(limit)
    .toArray();
  return {
    totalCars,
    cars,
  };
};

const getCarByDealerId = async (filters = {}, page = 1, limit = 30) => {
  const db = await connectToDatabase();
  const dealerCol = db.collection("dealers");
  const carsCol = db.collection("cars");

  const dealer = await dealerCol.findOne({ dealerId: filters.dealerId });
  if (!dealer || !Array.isArray(dealer.cars) || dealer.cars.length === 0) {
    return { totalCars: 0, cars: [] };
  }

  const query = { carId: { $in: dealer.cars.map(String) } };

  if (filters.carType)
    query.lang.en.carType = { $regex: new RegExp(filters.carType, "i") };

  if (filters.brand && filters.brand.length > 0) {
    query["lang.en.carBrand"] = {
      $in: filters.brand.map((b) => new RegExp(b, "i")),
    };
  }
  if (filters.model && filters.model.length > 0) {
    query["lang.en.carModel"] = {
      $in: filters.model.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.fuel && filters.fuel.length > 0) {
    query["lang.en.carFuel"] = {
      $in: filters.fuel.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.transmission && filters.transmission.length > 0) {
    query["lang.en.carTransmission"] = {
      $in: filters.transmission.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.vehicleType && filters.vehicleType.length > 0) {
    query["lang.en.carBody"] = {
      $in: filters.vehicleType.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.country && filters.country.length > 0) {
    query["lang.en.carCountry"] = {
      $in: filters.country.map((b) => new RegExp(b, "i")),
    };
  }

  if (filters.priceMin || filters.priceMax) {
    query.price_incl_btw = {};
    if (filters.priceMin) query.price_incl_btw.$gte = Number(filters.priceMin);
    if (filters.priceMax) query.price_incl_btw.$lte = Number(filters.priceMax);
  }
  if (filters.mileageMin || filters.mileageMax) {
    query.carMileage = {};
    if (filters.mileageMin) query.carMileage.$gte = Number(filters.mileageMin);
    if (filters.mileageMax) query.carMileage.$lte = Number(filters.mileageMax);
  }
  if (filters.erdMin || filters.erdMax) {
    query.carERD = {};
    if (filters.erdMin) query.carERD.$gte = Number(filters.erdMin);
    if (filters.erdMax) query.carERD.$lte = Number(filters.erdMax);
  }

  const totalCars = await carsCol.countDocuments(query);

  const projection = {
    carId: 1,
    carImages: 1,
    "lang.en.carBrand": 1,
    "lang.nl.carBrand": 1,
    "lang.ua.carBrand": 1,
    "lang.ru.carBrand": 1,
    "lang.en.carModel": 1,
    "lang.nl.carModel": 1,
    "lang.ua.carModel": 1,
    "lang.ru.carModel": 1,
    "lang.en.carFuel": 1,
    "lang.nl.carFuel": 1,
    "lang.ua.carFuel": 1,
    "lang.ru.carFuel": 1,
    price_incl_btw: 1,
    carMileage: 1,
    carERD: 1,
  };

  const cars = await carsCol
    .find(query, { projection })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { totalCars, dealer, cars };
};

export {
  createNewCar,
  getCarById,
  getAllCars,
  getCarsWithFilters,
  getCarsWithMultiFilters,
  getCarByDealerId,
};
