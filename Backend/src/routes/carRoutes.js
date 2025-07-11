import "dotenv/config.js";
import Router from "express";
import multer from "multer";
import { uploadImage } from "../services/cloudinary.js";
import { addNewCar, getAllCars, getCarById } from "../services/carServices.js";
import { getBrandModelsCountries } from "../services/brandModelCountryServices.js";
import {
  getDealers,
  addNewDealer,
  addCarIdToDealer,
} from "../services/dealerServices.js";

const carRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array("carImages[]");

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

carRouter.get("/get-car-by-id", async (req, res) => {
  try {
    const carId = req.query.carId;
    console.log(carId);

    if (!carId) {
      return res.status(400).json({ message: "Missing carId query parameter" });
    }

    const car = await getCarById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car);
  } catch (err) {
    console.error("Error in /get-car-by-id:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

carRouter.put("/update-car", async (req, res) => {});

carRouter.post("/add-car", upload, async (req, res) => {
  try {
    const carData = JSON.parse(req.body.carData);
    const carImages = req.files;

    const uploadedImages = await Promise.all(
      carImages.map(async (file) => {
        const uploaded = await uploadImage(file);

        if (!uploaded || !uploaded.url) {
          throw new Error("Image upload failed or did not return a URL");
        }

        return {
          url: uploaded.url,
          public_id: uploaded.public_id,
        };
      })
    );
    carData.carImages = uploadedImages;
    if (!carData.dealer.isOther) {
      carData.dealer = carData.dealer.dealerId;
      let carId = await addNewCar(carData);

      await addCarIdToDealer(carId, carData.dealer);
    } else {
      let newDealerData = carData.dealer;
      delete newDealerData.isOther;
      delete newDealerData.dealerId;
      let newDealerId = await addNewDealer(newDealerData);
      if (newDealerId) {
        console.log(newDealerId);
        carData.dealer = newDealerId;
        let carId = await addNewCar(carData);
        if (carId) {
          await addCarIdToDealer(carId, carData.dealer);
        }
      }
    }

    res.status(200).json({ message: "Car added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

carRouter.get("/get-all-cars", async (req, res) => {
  const page = req.query.pageNumber || 1;

  if (page) {
    console.log(page);
  }

  try {
    const { totalCars, cars } = await getAllCars(page);
    res.status(200).json({ totalCars, cars });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

carRouter.get("/dealers", (_req, res) => fetchRes(res, getDealers));

export default carRouter;
