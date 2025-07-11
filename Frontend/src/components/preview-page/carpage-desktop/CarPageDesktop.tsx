import CarInfoCover from "../car-info-cover/CarInfoCover";
import { CarDamagesDetailsCard } from "../car-damages-card/CarDamagesDetailsCard";
import { Options } from "../options/Options";
import CarPriceInfo from "../car-price-info/CarPriceInfo";
import CarInfoCardContainer from "../car-info-card-container/CarInfoCardContainer";
import { DealerInfo } from "../dealer-infomation/DealerInfo";
import styles from "./carpage-desktop.module.css";
import { ICarPageProps } from "../../../types/otherTypes";

export const CarPageDesktop = ({
  coverImages,
  carNameModel,
  inc_btw_price,
  excl_btw_price,
  excl_bpm_btw_price,
  carMileage,
  carTransmission,
  carFuel,
  carPower,
  carEngineCapacity,
  carERD,
  carVat,
  carColor,
  carVanish,
  carBody,
  carNumberOfDoors,
  carWeight,
  damages,
  options,
  dealerInfo,
}: ICarPageProps) => {
  return (
    <div className={styles.car_page_desktop_container}>
      <div className={styles.left}>
        <CarInfoCover coverImages={coverImages} />
        <CarDamagesDetailsCard damages={damages} />
        <Options carOptions={options} />
      </div>
      <div className={styles.right}>
        <CarPriceInfo
          carNameModel={carNameModel}
          inc_btw_price={inc_btw_price}
          excl_btw_price={excl_btw_price}
          excl_bpm_btw_price={excl_bpm_btw_price}
        />
        <CarInfoCardContainer
          carDetails={{
            carMileage,
            carTransmission,
            carFuel,
            carPower,
            carEngineCapacity,
            carERD,
            carVat,
            carColor,
            carVanish,
            carBody,
            carNumberOfDoors,
            carWeight,
          }}
        />
        <DealerInfo dealer={dealerInfo}/>
      </div>
    </div>
  );
};
