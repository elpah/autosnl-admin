import TotalCard from "../../components/totalCards/TotalCard";
import {
  total_cars,
  total_damaged,
  total_used,
  total_dealers,
} from "../../assets/images/images";
import { ClipLoader } from "react-spinners";

import styles from "./dashboard-page.module.css";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import useGetTotals from "../../hooks/useGetTotal";

const DashboardPage = () => {
  const { data, isLoading, error } = useGetTotals();

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <ClipLoader color="#3498db" size={35} />
      </div>
    );

  if (error) return <div>{error?.message}</div>;

  const totalCards = [
    {
      image: total_cars,
      header: data?.totalCars || 0,
      total_text: "Total number of cars",
    },
    {
      image: total_used,
      header: data?.totalUsed || 0,
      total_text: "Total number of used Cars",
    },
    {
      image: total_damaged,
      header: data?.totalDamaged || 0,
      total_text: "Total number of damaged Cars",
    },
    {
      image: total_dealers,
      header: data?.totalDealers || 0,
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
