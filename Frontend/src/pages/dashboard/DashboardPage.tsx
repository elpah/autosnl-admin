import TotalCard from "../../components/totalCards/TotalCard";
import {
  total_cars,
  total_damaged,
  total_used,
  total_dealers,
} from "../../assets/images/images";

import styles from "./dashboard-page.module.css";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";

const DashboardPage = () => {
  const totalCards = [
    { image: total_cars, header: 5000, total_text: "Total number of cars" },
    {
      image: total_used,
      header: 3000,
      total_text: "Total number of used Cars",
    },
    {
      image: total_damaged,
      header: 3000,
      total_text: "Total number of damaged Cars",
    },
    {
      image: total_dealers,
      header: 3000,
      total_text: "Total Number of dealers",
    },
  ];
  return (
    <DashboardLayout>
      <div className={styles.total_cards_container}>
        {totalCards.map((totalCar, index) => (
          <TotalCard
            key={index}
            header={totalCar.header.toString()}
            image={totalCar.image}
            total_text={totalCar.total_text}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
