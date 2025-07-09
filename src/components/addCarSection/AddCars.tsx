import { useContext } from "react";
import {
  basic_map,
  dealer_map,
  advanced_map,
} from "../../assets/images/images";

import AddCarForm from "../addCarForm/AddCarForm";
import AddDealerForm from "../addDealerForm/AddDealerForm";
import AddAdvancedInfo from "../addAdvancedInfo/AddAdvancedInfo";
import AddBasicInfo from "../addBasicInfo/AddBasicInfo";
import {
  GlobalContext,
  ICarData,
  type Lang,
} from "../../context/GlobalContext";
import LanguageSelector from "../languageSelector/LanguageSelector";
import ButtonContainer from "../buttonContainer/ButtonContainer";
import styles from "./add-car.module.css";
import useCreateCar from "../../hooks/useCreateCar";
import { handleScrollToTop } from "../../utils/utilFunctions";

const AddCars = () => {
  const globalContext = useContext(GlobalContext);
  const { mutate, isPending, isError, isSuccess, error } = useCreateCar();
  // const { data, isLoading } = useBrandModel();

  const handleNext = () => {
    handleScrollToTop();
    const requiredBasicFields = [
      "carCategory",
      "carBrand",
      "carModel",
      "carBody",
      "carColor",
      "carTransmission",
      "carCountry",
      "carFuel",
      "carVanish",
    ] as const;

    const requiredAdvancedFields: Array<keyof ICarData> = [
      "carMileage",
      "carPower",
      "carEngineCapacity",
      "carERD",
      "carMODTill",
      "price_incl_btw",
      "price_excl_btw",
      "price_excl_bpm",
      "carVat",
      "carNumberOfDoors",
    ];

    const langs: Lang[] = ["en", "nl", "ru", "ua"];
    const carLangData = globalContext.carData.lang;

    const missingBasicFields = requiredBasicFields.filter((field) => {
      return langs.some((lang) => {
        const langData = carLangData[lang];
        return !langData || langData[field] === "";
      });
    });

    const missingAdvancedFields = requiredAdvancedFields.filter((field) => {
      const value = globalContext.carData[field];

      if (typeof value === "string") {
        return value.trim() === "";
      }

      if (typeof value === "number") {
        return value === 0;
      }

      return false;
    });

    if (globalContext.currentSelection === "Basic") {
      if (globalContext.currentLanguage === "en") {
        globalContext.setCurrentLanguage("nl");
      } else if (globalContext.currentLanguage === "nl") {
        globalContext.setCurrentLanguage("ru");
      } else if (globalContext.currentLanguage === "ru") {
        globalContext.setCurrentLanguage("ua");
      } else if (globalContext.currentLanguage === "ua") {
        globalContext.setCurrentSelection("Advanced");
      }
    }
    if (globalContext.currentSelection === "Advanced") {
      globalContext.setCurrentSelection("Dealer");
    }
    if (globalContext.currentSelection === "Dealer") {
      if (missingBasicFields.length > 0 || missingAdvancedFields.length > 0)
        alert(
          `Please fill out all required fields before proceeding:\n${missingBasicFields.join(
            ", "
          )}
            \n${missingAdvancedFields.join(", ")}`
        );
      else {
        mutate(globalContext.carData, {
          onSuccess: () => {
            alert("Car successfully added!");
          },
          onError: (err) => {
            alert("Something went wrong while submitting.");
            console.error(err);
          },
        });
      }
    }
  };

  const handlePrev = () => {
 
    if(globalContext.currentLanguage!== "en" && globalContext.currentSelection !== "Basic")
    {handleScrollToTop();}


    if (globalContext.currentSelection === "Dealer") {
      globalContext.setCurrentSelection("Advanced");
    } else if (globalContext.currentSelection === "Advanced") {
      globalContext.setCurrentSelection("Basic");
    } else {
      if (globalContext.currentSelection === "Basic") {
        if (globalContext.currentLanguage === "ua") {
          globalContext.setCurrentLanguage("ru");
        } else if (globalContext.currentLanguage === "ru") {
          globalContext.setCurrentLanguage("nl");
        } else if (globalContext.currentLanguage === "nl") {
          globalContext.setCurrentLanguage("en");
        } else {
          return;
        }
      }
    }
  };

  const basicInfoTags = {
    en: {
      categoryTag: "Category En",
      brandTag: "Brand En",
      modelTag: "Model En",
      countryTag: "Country En",
      bodyTag: "Body En",
      transmissionTag: "Transmission En",
      fuelTag: "Fuel En",
      vanishTag: "Vanish En",
      detailsTag: "Details En",
      colorTag: "Color En",
      damageDetailsTag: "Damage Details En",
      carOptionsTag: "Options En",
    },
    nl: {
      categoryTag: "Category Nl",
      brandTag: "Brand Nl",
      modelTag: "Model Nl",
      countryTag: "Country Nl",
      bodyTag: "Body Nl",
      transmissionTag: "Transmission Nl",
      fuelTag: "Fuel Nl",
      vanishTag: "Vanish Nl",
      detailsTag: "Details Nl",
      colorTag: "Color Nl",
      damageDetailsTag: "Damage Details Nl",
      carOptionsTag: "Options Nl",
    },
    ru: {
      categoryTag: "Category Ru",
      brandTag: "Brand Ru",
      modelTag: "Model Ru",
      countryTag: "Country Ru",
      bodyTag: "Body Ru",
      transmissionTag: "Transmission Ru",
      fuelTag: "Fuel Ru",
      vanishTag: "Vanish Ru",
      detailsTag: "Details Ru",
      colorTag: "Color Ru",
      damageDetailsTag: "Damage Details Ru",
      carOptionsTag: "Options Ru",
    },
    ua: {
      categoryTag: "Category Ua",
      brandTag: "Brand Ua",
      modelTag: "Model Ua",
      countryTag: "Country Ua",
      bodyTag: "Body Ua",
      transmissionTag: "Transmission Ua",
      fuelTag: "Fuel Ua",
      vanishTag: "Vanish Ua",
      detailsTag: "Details Ua",
      colorTag: "Color Ua",
      damageDetailsTag: "Damage Details Ua",
      carOptionsTag: "Options Ua",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.info_heads}>
        <div
          className={`${styles.icon_name} ${
            globalContext.currentSelection === "Basic" ? styles.active : ""
          }`}
          onClick={() => globalContext.setCurrentSelection("Basic")}
        >
          <img src={basic_map} alt="stacks" />
          <p>Basic Info</p>
        </div>
        <div
          className={`${styles.icon_name} ${
            globalContext.currentSelection === "Advanced" ? styles.active : ""
          }`}
          onClick={() => globalContext.setCurrentSelection("Advanced")}
        >
          <img src={advanced_map} alt="advanced icon" />
          <p>Advanced</p>
        </div>
        <div
          className={`${styles.icon_name} ${
            globalContext.currentSelection === "Dealer" ? styles.active : ""
          }`}
          onClick={() => globalContext.setCurrentSelection("Dealer")}
        >
          <img src={dealer_map} alt="dealer_icon" />
          <p>Dealer</p>
        </div>
      </div>
      <h2 className={styles.header}>{globalContext.currentSelection}</h2>
      {globalContext.currentSelection === "Basic" && <LanguageSelector />}
      <section className={styles.form_section}>
        <AddCarForm>
          {globalContext.currentSelection === "Basic" && (
            <AddBasicInfo {...basicInfoTags[globalContext.currentLanguage]} />
          )}

          {globalContext.currentSelection === "Advanced" && <AddAdvancedInfo />}
          {globalContext.currentSelection === "Dealer" && <AddDealerForm />}
          <ButtonContainer
            handleNextClick={handleNext}
            handlePreviousClick={handlePrev}
          />
        </AddCarForm>

        {isPending ? "Submitting form" : "sucess .. handle properly later"}
      </section>
    </div>
  );
};

export default AddCars;
