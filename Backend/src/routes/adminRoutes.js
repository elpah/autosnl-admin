import "dotenv/config.js";
import Router from "express";
import multer from "multer";
import { uploadImage } from "../services/admin-services/cloudinary.js";
import { getBrandModelsCountries } from "../services/admin-services/brandModelCountryServices.js";
import {
  addNewCar,
  getAllCars,
  getTotalCars,
  getCarById,
  deleteCarById,
  recommendCarById,
  permanentDeleteCarById,
  restoreCar,
} from "../services/admin-services/carServices.js";
import {
  getDealers,
  addNewDealer,
  addCarIdToDealer,
} from "../services/admin-services/dealerServices.js";

const adminRouter = Router();
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

adminRouter.get("/adminbrandmodelscountries", (_req, res) =>
  fetchRes(res, getBrandModelsCountries)
);

adminRouter.get("/get-car-by-id/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    if (!carId) {
      return res.status(400).json({ message: "Missing carId query parameter" });
    }

    const car = await getCarById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error in /get-car-by-id:", err);
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

adminRouter.put("/update-car", async (req, res) => {});

adminRouter.post("/add-car", upload, async (req, res) => {
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
        carData.dealer = newDealerId;
        let carId = await addNewCar(carData);
        if (carId) {
          await addCarIdToDealer(carId, carData.dealer);
        }
      }
    }

    res.status(200).json({ message: "Car added successfully" });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    res.status(500).json({ message: "Something went wrong" });
  }
});

adminRouter.get("/get-total-cars", async (_req, res) => {
  try {
    const { totalCars, totalDealers, totalDamaged, totalUsed, test } =
      await getTotalCars();

    res
      .status(200)
      .json({ totalCars, totalDealers, totalDamaged, totalUsed, test });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.get("/admin-get-all-cars", async (req, res) => {
  try {
    let {
      pageNumber = 1,
      type = "available",
      sortBy = "",
      brand = "",
      model = "",
      category = "",
    } = req.query;

    let sortOptions = {};
    if (sortBy === "price_asc") {
      sortOptions = { price_incl_btw: 1 };
    } else if (sortBy === "price_desc") {
      sortOptions = { price_incl_btw: -1 };
    } else {
      sortOptions = { createdAt: -1 };
    }

    let newObject = {
      pageNumber: pageNumber || 1,
      type: type || "available",
      sortOptions: sortOptions,
      carBrand: brand || "",
      carModel: model || "",
      carCategory: category === "all" ? "" : category,
    };
    const { totalCars, cars } = await getAllCars(newObject);

    res.status(200).json({ totalCars, cars });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.delete("/delete-car/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    const result = await deleteCarById(carId);
    if (result.success) {
      res.status(200).json({ message: "Car deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting car:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.patch("/restore-car/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    const result = await restoreCar(carId);
    if (result.success) {
      res.status(200).json({ message: "Car Restored successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error restoring car:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.delete("/permanent-delete-car/:carId", async (req, res) => {
  const { carId } = req.params;
  try {
    const result = await permanentDeleteCarById(carId);
    if (result.success) {
      res.status(200).json({ message: "Car deleted successfully" });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.patch("/recommend-car", async (req, res) => {
  const carId = req.query.carId;
  try {
    const result = await recommendCarById(carId);
    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error recommending car:", err);
    }
    res.status(500).send("Internal Server Error");
  }
});

adminRouter.get("/dealers", (_req, res) => fetchRes(res, getDealers));

export default adminRouter;
