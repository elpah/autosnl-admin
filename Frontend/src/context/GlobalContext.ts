import { User } from "firebase/auth";
import { createContext } from "react";

export type IUser = {
  firebaseUid: string;
  profileImage: File | string;
  firstname: string;
  lastname: string;
  email: string;
};

export const initialUser = {
  profileImage: "",
  firstname: "",
  lastname: "",
  email: "",
  firebaseUid: "",
};

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

export type GetCarsParams = {
  pageNumber: number;
  brand: string;
  model: string;
  category: string;
  sortBy: "price_asc" | "price_desc" | "none";
};

export const initialGetCarsParams: GetCarsParams = {
  brand: "",
  model: "",
  category: "",
  pageNumber: 1,
  sortBy: "none",
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
  carType: string;
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
  isOther?: boolean;
  dealerId?: string;
  dealerName?: string;
  dealerEmail?: string;
  dealerPhone?: string;
  dealerAddress?: string;
};

export const emptyCarTranslationFields: CarTranslationFields = {
  carType: "",
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
  isRecommended: false,
};

export type ICarData = {
  carId?: string;
  lang: {
    en: CarTranslationFields;
    nl: CarTranslationFields;
    ru: CarTranslationFields;
    ua: CarTranslationFields;
  };
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
  isRecommended?: boolean;
};

export type currentActionType = "isEditing" | "isAdding" | null;
export type Lang = "en" | "nl" | "ru" | "ua";
export type MenuOption =
  | "dashboard"
  | "cars"
  | "settings"
  | "sign out"
  | "add-car"
  | null;

export interface IGlobalContext {
  currentLanguage: Lang;
  carPageLang: Lang;
  setCarPageLang: React.Dispatch<React.SetStateAction<Lang>>;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Lang>>;
  carData: ICarData;
  setCarData: React.Dispatch<React.SetStateAction<ICarData>>;
  activeMenu: MenuOption;
  setActiveMenu: React.Dispatch<React.SetStateAction<MenuOption>>;
  currentSelection: "Basic" | "Advanced" | "Dealer";
  setCurrentSelection: React.Dispatch<
    React.SetStateAction<"Basic" | "Advanced" | "Dealer">
  >;
  other: IOther;
  setOther: React.Dispatch<React.SetStateAction<IOther>>;
  currentAction: currentActionType;
  setCurrentAction: React.Dispatch<React.SetStateAction<currentActionType>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  pendingLink: string | null;
  setPendingLink: React.Dispatch<React.SetStateAction<string | null>>;
  getCarsParams: GetCarsParams;
  setGetCarsParams: React.Dispatch<React.SetStateAction<GetCarsParams>>;
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  authLoading: boolean;
  setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loggedUser: IUser;
  setLoggedUser: React.Dispatch<React.SetStateAction<IUser>>;
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
  currentAction: null,
  setCurrentAction: () => {},
  showModal: false,
  setShowModal: () => {},
  pendingLink: null,
  setPendingLink: () => {},
  getCarsParams: initialGetCarsParams,
  setGetCarsParams: () => {},
  authUser: null,
  setAuthUser: () => {},
  authLoading: true,
  setAuthLoading: () => {},
  loggedUser: initialUser,
  setLoggedUser: () => {},
});
