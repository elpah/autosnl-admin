import { connectToDatabase } from "../../config/db.js";

const getBrandModelsCountries = async () => {
  try {
    const db = await connectToDatabase();
    const col = db.collection("cars");
    const colCountries = db.collection("countries");
    const colBodyTypes = db.collection("bodyTypes");
    const colFuels = db.collection("fuels");
    const colTransmissions = db.collection("transmissions");

    const pipelineBrandsModels = [
      {
        $group: {
          _id: {
            brand_en: "$lang.en.carBrand",
            brand_ru: "$lang.ru.carBrand",
            brand_nl: "$lang.nl.carBrand",
            brand_ua: "$lang.ua.carBrand",
            model_en: "$lang.en.carModel",
            model_ru: "$lang.fru.carModel",
            model_nl: "$lang.nl.carModel",
            model_ua: "$lang.ua.carModel",
          },
        },
      },
      {
        $group: {
          _id: {
            brand_en: "$_id.brand_en",
            brand_ru: "$_id.brand_ru",
            brand_nl: "$_id.brand_nl",
            brand_ua: "$_id.brand_ua",
          },
          models: {
            $push: {
              en: "$_id.model_en",
              ru: "$_id.model_ru",
              nl: "$_id.model_nl",
              ua: "$_id.model_ua",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          brand: {
            en: "$_id.brand_en",
            ru: "$_id.brand_ru",
            nl: "$_id.brand_nl",
            ua: "$_id.brand_ua",
          },
          models: 1,
        },
      },
    ];

    const brandsModelsResult = await col
      .aggregate(pipelineBrandsModels)
      .toArray();

    // Fetch countries directly from the countries collection
    const countries = await colCountries.find().toArray();
    const bodies = await colBodyTypes.find().toArray();
    const fuels = await colFuels.find().toArray();
    const transmissions = await colTransmissions.find().toArray();

    let formattedResult = { brands: {}, countries: {}, fuel: {}, body: {} };

    brandsModelsResult.forEach(({ brand, models }) => {
      let brandKey = brand.en.toLowerCase();
      if (!formattedResult.brands[brandKey]) {
        formattedResult.brands[brandKey] = {
          name: brand,
          models: {},
        };
      }

      models.forEach((model) => {
        let modelKey = model.en.toLowerCase();
        if (!formattedResult.brands[brandKey].models[modelKey]) {
          formattedResult.brands[brandKey].models[modelKey] = {
            en: model.en,
            ru: model.ru || model.en,
            nl: model.nl || model.en,
            ua: model.ua || model.en,
          };
        }
      });
    });

    const countryObject = {};
    const bodyObject = {};
    const fuelObject = {};
    const transmissionObject = {};

    countries.forEach((entry) => {
      const [key, value] = Object.entries(entry).find(
        ([k]) => k !== "id" && k !== "_id"
      );
      countryObject[key] = value;
    });

    transmissions.forEach((entry) => {
      const [key, value] = Object.entries(entry).find(
        ([k]) => k !== "id" && k !== "_id"
      );
      transmissionObject[key] = value;
    });

    bodies.forEach((entry) => {
      const [key, value] = Object.entries(entry).find(
        ([k]) => k !== "id" && k !== "_id"
      );
      bodyObject[key] = value;
    });

    fuels.forEach((entry) => {
      const [key, value] = Object.entries(entry).find(
        ([k]) => k !== "id" && k !== "_id"
      );
      fuelObject[key] = value;
    });

    formattedResult.countries = countryObject;
    formattedResult.body = bodyObject;
    formattedResult.fuel = fuelObject;
    formattedResult.transmission = transmissionObject;

    return formattedResult;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error retrieving car metadata:", error);
    }
    return {};
  }
};

export { getBrandModelsCountries };
