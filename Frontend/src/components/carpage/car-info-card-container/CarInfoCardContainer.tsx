import {
  milleage,
  transmission,
  fuel_type,
  erd,
  power,
  engine_capacity,
  weight,
  vat,
  color,
  body,
  number_of_doors,
  vanish,
} from "../../../assets/images/images";
import { CarInfoCard } from "../car_info-card/CarInfoCard";

import styles from "./car-info-card-container.module.css";

type CarInfoProps = {
  carDetails: {
    carMileage: string;
    carTransmission: string;
    carFuel: string;
    carPower: string;
    carEngineCapacity: string;
    carERD: string;
    carVat: string;
    carColor: string;
    carVanish: string;
    carBody: string;
    carNumberOfDoors: string;
    carWeight?: string;
  };
};

const CarInfoCardContainer = ({ carDetails }: CarInfoProps) => {
  const carInformation = [
    {
      header: "Mileage",
      value: carDetails.carMileage,
      card_icon: milleage,
      bg: true,
    },
    {
      header: "Transmission",
      value: carDetails.carTransmission,
      card_icon: transmission,
      bg: true,
    },
    {
      header: "Fuel Type",
      value: carDetails.carFuel,
      card_icon: fuel_type,
      bg: true,
    },
    { header: "ERD", value: carDetails.carERD, card_icon: erd, bg: true },
    {
      header: "Power",
      value: carDetails.carPower,
      card_icon: power,
      bg: false,
    },
    {
      header: "Engine Capacity",
      value: carDetails.carEngineCapacity,
      card_icon: engine_capacity,
      bg: false,
    },
    {
      header: "Weight",
      value: carDetails.carWeight,
      card_icon: weight,
      bg: false,
    },
    { header: "Vat", value: carDetails.carVat, card_icon: vat, bg: false },
    {
      header: "Color",
      value: carDetails.carColor,
      card_icon: color,
      bg: false,
    },
    {
      header: "Body Type",
      value: carDetails.carBody,
      card_icon: body,
      bg: false,
    },
    {
      header: "Number of doors",
      value: carDetails.carNumberOfDoors,
      card_icon: number_of_doors,
      bg: false,
    },
    {
      header: "vanish",
      value: carDetails.carVanish,
      card_icon: vanish,
      bg: false,
    },
  ];
  return (
    <div className={styles.car_info_cards_container}>
      {carInformation.map((info, index) => (
        <CarInfoCard
          key={index}
          card_header={info.header}
          bg={info.bg}
          card_icon={info.card_icon}
          card_value={info.value || "N/A"}
        />
      ))}
    </div>
  );
};
export default CarInfoCardContainer;
