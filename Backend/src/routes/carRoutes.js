import "dotenv/config.js";
import Router from "express";
const carRouter = Router();

import { getBrandModelsCountries } from "../services/brandModelCountryServices.js";

carRouter.get("/testing-endpoint", async (req, res) => {
  try {
    res.status(200).send("Successfully reached endpoint!!!");
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).send(err.message);
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

carRouter.get("/brandmodelscountries", (_req, res) =>
  fetchCars(res, getBrandModelsCountries)
);

export default carRouter;
