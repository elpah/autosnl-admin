import "dotenv/config.js";
import { connectToDatabase } from "../../config/db.js";

export const getHomeSections = async () => {
  try {
    const db = await connectToDatabase();
    const homeSectionDoc = await db
      .collection("homeSections")
      .findOne({ type: "homeSections" });

    if (!homeSectionDoc) {
      throw new Error("Home sections not found");
    }
    const { recommended, trusted, damaged } = homeSectionDoc;
    const fetchCarsAndBrandsBySection = async (carIds) => {
      const cars = await db
        .collection("cars")
        .find({ carId: { $in: carIds } })
        .project({
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
          "lang.en.carBody": 1,
          "lang.nl.carBody": 1,
          "lang.ua.carBody": 1,
          "lang.ru.carBody": 1,
          carMileage: 1,
          carERD: 1,
         price_incl_btw:1

        })
        .limit(30)
        .toArray();
      const body = {};
      cars.forEach((car) => {
        const bodyType = car.lang.en.carBody;
        if (!body[bodyType]) {
          body[bodyType] = {
            en: car.lang.en.carBody,
            ru: car.lang.ru.carBody,
            nl: car.lang.nl.carBody,
            ua: car.lang.ua.carBody,
          };
        }
      });

      return { cars, body };
    };
    const { cars: recommendedCars, body: recommendedBrands } =
      await fetchCarsAndBrandsBySection(recommended);
    const { cars: trustedCars, body: trustedBrands } =
      await fetchCarsAndBrandsBySection(trusted);
    const { cars: damagedCars, body: damagedBrands } =
      await fetchCarsAndBrandsBySection(damaged);
    const sections = {
      recommended: { cars: recommendedCars, body: recommendedBrands },
      trusted: { cars: trustedCars, body: trustedBrands },
      damaged: { cars: damagedCars, body: damagedBrands },
    };
    return { sections };
  } catch (error) {
    console.error("Error fetching home sections:", error);
    throw new Error("Query failed");
  }
};
