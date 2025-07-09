import { createContext } from "react";

export type CarOptionCategories = {
  airbag: string[];
  coolingAndHeating: string[];
  security: string[];
  entertainment: string[];
  comfortInterior: string[];
  comfortExterior: string[];
  safety: string[];
  lighting: string[];
};

export type CarDamage = {
  title: string;
  text: string;
};

export type IOther = {
  carBrand: string;
  carModel: string;
  carCountry: string;
  carBody: string;
  carFuel: string;
  carVanish: string;
};

export type CarTranslationFields = {
  carCategory: string;
  carBrand: string;
  carModel: string;
  carDetails: string;
  carBody: string;
  carColor: string;
  carTransmission: string;
  carCountry: string;
  carFuel: string;
  carVanish: string;
  carDamageDetails: CarDamage[] | any;
  carOptions: CarOptionCategories;
};

export type IDealer = {
  isOther: boolean;
  dealerId?: string;
  dealerName?: string;
  dealerEmail?: string;
  dealerPhone?: string;
  dealerAddress?: string;
};

export const emptyCarTranslationFields: CarTranslationFields = {
  carCategory: "",
  carBrand: "",
  carModel: "",
  carCountry: "",
  carDetails: "",
  carBody: "",
  carColor: "",
  carTransmission: "",
  carFuel: "",
  carVanish: "",
  carDamageDetails: [],
  carOptions: {
    airbag: [],
    coolingAndHeating: [],
    security: [],
    entertainment: [],
    comfortInterior: [],
    comfortExterior: [],
    safety: [],
    lighting: [],
  },
};

export const initialOther: IOther = {
  carBrand: "",
  carModel: "",
  carCountry: "",
  carBody: "",
  carFuel: "",
  carVanish: "",
};

export const initialCarData: ICarData = {
  lang: {
    en: { ...emptyCarTranslationFields },
    nl: { ...emptyCarTranslationFields },
    ru: { ...emptyCarTranslationFields },
    ua: { ...emptyCarTranslationFields },
  },
  carType: "",
  carImages: [],
  carMileage: 0,
  carPower: "",
  carEngineCapacity: "",
  carERD: 0,
  carMODTill: "",
  price_incl_btw: 0,
  price_excl_btw: 0,
  price_excl_bpm: 0,
  carVat: 0,
  carNumberOfDoors: "0",
  carWeight: "",
  dealer: {
    isOther: false,
    dealerName: "",
    dealerId: "",
    dealerAddress: "",
    dealerEmail: "",
    dealerPhone: "",
  },
};

export type ICarData = {
  lang: {
    en: CarTranslationFields;
    nl: CarTranslationFields;
    ru: CarTranslationFields;
    ua: CarTranslationFields;
  };
  carType: string;
  carImages: File[];
  carMileage: number;
  carPower: string;
  carEngineCapacity: string;
  carERD: number;
  carMODTill: string;
  price_incl_btw: number;
  price_excl_btw: number;
  price_excl_bpm: number;
  carVat: number;
  carNumberOfDoors: string;
  carWeight: string;
  dealer: IDealer;
};

export type Lang = "en" | "nl" | "ru" | "ua";

export interface IGlobalContext {
  currentLanguage: Lang;
  carPageLang: Lang;
  setCarPageLang: React.Dispatch<React.SetStateAction<Lang>>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Lang>>;
  carData: ICarData;
  setCarData: React.Dispatch<React.SetStateAction<ICarData>>;
  activeMenu: "dashboard" | "cars" | "settings" | "preview" | "sign out";
  setActiveMenu: React.Dispatch<
    React.SetStateAction<
      "dashboard" | "cars" | "settings" | "preview" | "sign out"
    >
  >;
  currentSelection: "Basic" | "Advanced" | "Dealer";
  setCurrentSelection: React.Dispatch<
    React.SetStateAction<"Basic" | "Advanced" | "Dealer">
  >;

  other: IOther;
  setOther: React.Dispatch<React.SetStateAction<IOther>>;
}

export const GlobalContext = createContext<IGlobalContext>({
  currentLanguage: "en",
  setCurrentLanguage: () => {},
  carPageLang: "en",
  setCarPageLang: () => {},
  carData: initialCarData,
  setCarData: () => {},
  activeMenu: "dashboard",
  setActiveMenu: () => {},
  currentSelection: "Basic",
  setCurrentSelection: () => {},
  other: initialOther,
  setOther: () => {},
});
