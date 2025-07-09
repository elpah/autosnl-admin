import { CarDamagesDetailsCard } from "../car-damages-card/CarDamagesDetailsCard";
import { Options } from "../options/Options";
import CarPriceInfo from "../car-price-info/CarPriceInfo";
import CarInfoCardContainer from "../car-info-card-container/CarInfoCardContainer";
import { DealerInfo } from "../dealer-infomation/DealerInfo";

import styles from "./car-page-mobile.module.css";
import { ICarPageProps } from "../../../types/otherTypes";
import CarInfoCover from "../car-info-cover/CarInfoCover";

export const CarPageMobile = ({
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
    <div className={styles.car_mobile_container_wrapper}>
      <div className={styles.car_mobile_container}>
        <CarInfoCover coverImages={coverImages} />
        <CarPriceInfo
          carNameModel={carNameModel}
          inc_btw_price={inc_btw_price}
          excl_btw_price={excl_btw_price}
          excl_bpm_btw_price={excl_bpm_btw_price}
        />
        <CarInfoCardContainer
          carDetails={{
            carMileage: carMileage,
            carTransmission: carTransmission,
            carFuel: carFuel,
            carPower: carPower,
            carEngineCapacity: carEngineCapacity,
            carERD: carERD,
            carVat: carVat,
            carColor: carColor,
            carVanish: carVanish,
            carBody: carBody,
            carNumberOfDoors: carNumberOfDoors,
            carWeight: carWeight,
          }}
        />
        <div className={styles.damages_card_container}>
          <CarDamagesDetailsCard damages={damages} />
        </div>
        <div className={styles.options_container}>
          <Options carOptions={options} />
        </div>
      </div>
      <div className={styles.dealer_details_container}>
        <DealerInfo dealer={dealerInfo} />
      </div>
    </div>
  );
};
