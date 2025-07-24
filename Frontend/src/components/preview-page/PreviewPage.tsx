import { useContext } from "react";
import { CarPageMobile } from "./carpage-mobile/CarPageMobile";
import { CarPageDesktop } from "./carpage-desktop/CarPageDesktop";
import {
  GlobalContext,
  IDealer,
  Lang,
  type IGlobalContext,
} from "../../context/GlobalContext";
import styles from "./preview-page.module.css";
import useDealers from "../../hooks/useDealers";
import CarButton from "../car-button/CarButton";

type PreviewPageProps = {
  handleButtonClick: () => void;
};

const PreviewPage = ({ handleButtonClick }: PreviewPageProps) => {
  const globalContext = useContext<IGlobalContext>(GlobalContext);
  const {
    data: dealerData,
    isLoading: dealerIsLoading,
    error: dealerError,
  } = useDealers();

  const languages = [
    { code: "en", label: "English" },
    { code: "nl", label: "Dutch" },
    { code: "ru", label: "Russian" },
    { code: "ua", label: "Ukrainian" },
  ];

  if (dealerError) {
    return <div>Error Loading dealers</div>;
  }

  if (dealerIsLoading) return <div>Loading...</div>;

  const getDealerInfo = (): IDealer | string | null => {
    const dealer = globalContext.carData.dealer;
    if (typeof dealer === "object") {
      if (!dealer.dealerId) {
        return dealer;
      }
      if (dealer.dealerId) {
        return (
          dealerData?.find(
            (dealerItem) => dealerItem.dealerId === dealer.dealerId
          ) || null
        );
      }
    }
    return null;
  };

  return (
    <div className={styles.car_page_container}>
      <div>
        <CarButton
          buttonText={"Back to form"}
          handleButtonClick={handleButtonClick}
        />
      </div>
      <div className={styles.language_select_container}>
        {languages.map(({ code, label }) => (
          <div
            key={code}
            className={
              globalContext.carPageLang === code ? styles.current_selection : ""
            }
            onClick={() => globalContext.setCarPageLang(code as Lang)}
          >
            {label}
          </div>
        ))}
      </div>
      <CarPageMobile
        coverImages={globalContext.carData.carImages}
        carNameModel={` ${
          globalContext.carData.lang[globalContext.carPageLang].carBrand
        } ${globalContext.carData.lang[globalContext.carPageLang].carModel}`}
        inc_btw_price={globalContext.carData.price_incl_btw.toString()}
        excl_btw_price={globalContext.carData.price_excl_btw.toString()}
        excl_bpm_btw_price={globalContext.carData.price_excl_bpm.toString()}
        carMileage={globalContext.carData.carMileage.toString()}
        carTransmission={
          globalContext.carData.lang[globalContext.carPageLang].carTransmission
        }
        carFuel={globalContext.carData.lang[globalContext.carPageLang].carFuel}
        carPower={globalContext.carData.carPower}
        carEngineCapacity={globalContext.carData.carEngineCapacity}
        carERD={globalContext.carData.carERD.toString()}
        carVat={globalContext.carData.carVat.toString()}
        carColor={
          globalContext.carData.lang[globalContext.carPageLang].carColor
        }
        carVanish={
          globalContext.carData.lang[globalContext.carPageLang].carVanish
        }
        carBody={globalContext.carData.lang[globalContext.carPageLang].carBody}
        carNumberOfDoors={globalContext.carData.carNumberOfDoors}
        carWeight={globalContext.carData.carWeight}
        damages={
          globalContext.carData.lang[globalContext.carPageLang].carDamageDetails
        }
        options={
          globalContext.carData.lang[globalContext.carPageLang].carOptions
        }
        dealerInfo={getDealerInfo() || globalContext.carData.dealer}
      />
      <CarPageDesktop
        coverImages={globalContext.carData.carImages}
        carNameModel={` ${
          globalContext.carData.lang[globalContext.carPageLang].carBrand
        } ${globalContext.carData.lang[globalContext.carPageLang].carModel}`}
        inc_btw_price={globalContext.carData.price_incl_btw.toString()}
        excl_btw_price={globalContext.carData.price_excl_btw.toString()}
        excl_bpm_btw_price={globalContext.carData.price_excl_bpm.toString()}
        carMileage={globalContext.carData.carMileage.toString()}
        carTransmission={
          globalContext.carData.lang[globalContext.carPageLang].carTransmission
        }
        carFuel={globalContext.carData.lang[globalContext.carPageLang].carFuel}
        carPower={globalContext.carData.carPower}
        carEngineCapacity={globalContext.carData.carEngineCapacity}
        carERD={globalContext.carData.carERD.toString()}
        carVat={globalContext.carData.carVat.toString()}
        carColor={
          globalContext.carData.lang[globalContext.carPageLang].carColor
        }
        carVanish={
          globalContext.carData.lang[globalContext.carPageLang].carVanish
        }
        carBody={globalContext.carData.lang[globalContext.carPageLang].carBody}
        carNumberOfDoors={globalContext.carData.carNumberOfDoors}
        carWeight={globalContext.carData.carWeight}
        damages={
          globalContext.carData.lang[globalContext.carPageLang].carDamageDetails
        }
        options={
          globalContext.carData.lang[globalContext.carPageLang].carOptions
        }
        dealerInfo={getDealerInfo() || globalContext.carData.dealer}
      />
    </div>
  );
};

export default PreviewPage;
