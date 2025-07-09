import "dotenv/config.js";
import Router from "express";
const carRouter = Router();

import { getBrandModelsCountries } from "../services/brandModelCountryServices.js";
import { getDealers } from "../services/dealersServices.js";

const fetchRes = async (res, fetchFunction) => {
  try {
    const cars = await fetchFunction();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

carRouter.get("/", async (_req, res) => {
  try {
    res.status(200).send("Successfully reached endpoint!!!");
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).send(err.message);
  }
});

carRouter.get("/brandmodelscountries", (_req, res) =>
  fetchRes(res, getBrandModelsCountries)
);

carRouter.post("/add-car", (_req, res) =>
  fetchRes(res, getBrandModelsCountries)
);

carRouter.get("/dealers", (_req, res) => fetchRes(res, getDealers));

export default carRouter;
