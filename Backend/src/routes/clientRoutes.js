import "dotenv/config.js";
import Router from "express";
import {
  getCarById,
  getCarsWithFilters,
  getCarsWithMultiFilters,
  getCarByDealerId,
} from "../services/client-services/carServices.js";
import { getHomeSections } from "../services/client-services/homeSectionService.js";
import { getBrandModelsCountries } from "../services/client-services/brandModelCountryServices.js";
import { processArrays, parseNums } from "../utils/utils.js";

const clientRouter = Router();

clientRouter.get("/carById", async (req, res) => {
  let { carId } = req.query;
  try {
    const { car, dealer } = await getCarById(carId);
    res.status(200).json({ car, dealer });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

clientRouter.get("/cars-search", async (req, res) => {
  let {
    carType,
    brand,
    model,
    fuel,
    transmission,
    vehicleType,
    country,
    pageNumber,
  } = req.query;

  carType = carType ? carType.toLowerCase() : "";
  brand = brand && brand !== "All Brands" ? brand.toLowerCase() : "";
  model = model ? model.toLowerCase() : "";
  fuel = fuel ? fuel.toLowerCase() : "";
  transmission = transmission ? transmission.toLowerCase() : "";
  vehicleType = vehicleType ? vehicleType.toLowerCase() : "";
  country = country ? country.toLowerCase() : "";
  const page = parseInt(pageNumber) || 1;
  try {
    const { totalCars, cars } = await getCarsWithFilters(
      {
        carType,
        brand,
        model,
        fuel,
        transmission,
        body: vehicleType,
        carCountry: country,
      },
      page
    );
    res.status(200).json({ totalCars, cars });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

clientRouter.get("/advanced-search", async (req, res) => {
  let {
    carType,
    brand,
    model,
    vehicleType,
    fuel,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    transmission,
    erdMin,
    erdMax,
    country,
    pageNumber,
    sortBy,
  } = req.query;

  let sortOptions = {};

  if (sortBy === "price_asc") {
    sortOptions = { price_incl_btw: 1 };
  } else if (sortBy === "price_desc") {
    sortOptions = { price_incl_btw: -1 };
  } else if (sortBy === "recent") {
    sortOptions = { createdAt: -1 };
  }

  try {
    const filters = {
      carType: carType ? carType.toLowerCase() : "",
      brand:
        brand && !brand.some((b) => b.toLowerCase() === "all brands")
          ? processArrays(brand)
          : [],
      model: processArrays(model),
      vehicleType: processArrays(vehicleType),
      fuel: processArrays(fuel),
      transmission: processArrays(transmission),
      country: processArrays(country),
      priceMin: parseNums(priceMin),
      priceMax: parseNums(priceMax),
      mileageMin: parseNums(mileageMin),
      mileageMax: parseNums(mileageMax),
      erdMin: parseNums(erdMin),
      erdMax: parseNums(erdMax),
      sortBy: sortOptions,
    };
    const page = parseInt(pageNumber) || 1;
    const { totalCars, cars } = await getCarsWithMultiFilters(filters, page);
    res.status(200).json({ totalCars, cars });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

clientRouter.get("/carByDealerId", async (req, res) => {
  let {
    carType,
    brand,
    model,
    vehicleType,
    fuel,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    transmission,
    erdMin,
    erdMax,
    country,
    pageNumber,
    dealerId,
  } = req.query;

  if (brand && brand.includes("All Brands")) {
    brand = [];
  }
  const page = parseInt(pageNumber) || 1;

  try {
    const filters = {
      carType: carType ? carType.toLowerCase() : "",
      brand: brand && !brand.includes("All Brands") ? processArrays(brand) : [],
      model: processArrays(model),
      vehicleType: processArrays(vehicleType),
      fuel: processArrays(fuel),
      transmission: processArrays(transmission),
      country: processArrays(country),
      priceMin: parseNums(priceMin),
      priceMax: parseNums(priceMax),
      mileageMin: parseNums(mileageMin),
      mileageMax: parseNums(mileageMax),
      erdMin: parseNums(erdMin),
      erdMax: parseNums(erdMax),
      dealerId,
    };

    const { totalCars, dealer, cars } = await getCarByDealerId(filters, page);
    res.status(200).json({ totalCars, dealer, cars });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching cars:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

const fetchCars = async (res, fetchFunction) => {
  try {
    const cars = await fetchFunction();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

clientRouter.get("/home-section", (_req, res) =>
  fetchCars(res, getHomeSections)
);
clientRouter.get("/brandmodelscountries", (_req, res) =>
  fetchCars(res, getBrandModelsCountries)
);
export default clientRouter;
