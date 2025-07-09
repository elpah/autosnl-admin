export type CarTranslation = {
  en: string;
  nl: string;
  ru: string;
  ua: string;
};

type Brand = {
  name: CarTranslation;
  models: Model;
};

type Model = {
  [modelName: string]: CarTranslation;
};
type Brands = {
  [brandName: string]: Brand;
};

type Fuel = CarTranslation;
type Body = CarTranslation;
type Country = CarTranslation;

type Countries = {
  [countryCode: string]: Country;
};

type FuelTypes = {
  [fuelType: string]: Fuel;
};

type Bodies = {
  [bodyType: string]: Body;
};

type transmissionTypes = {
  [bodyType: string]: Body;
};

export type ICarCategoriesResponse = {
  brands: Brands;
  countries: Countries;
  fuel: FuelTypes;
  body: Bodies;
  transmission: transmissionTypes;
};
