import { useContext } from "react";
import Nav from "../../components/nav/Nav";
import SideNav from "../../components/sideNav/SideNav";
import TotalCard from "../../components/totalCards/TotalCard";
import Greeting from "../../components/greeting/Greeting";
import CarsSection from "../../components/carsSection/CarsSection";
import SettingsSection from "../../components/settingsSection/SettingsSection";

import {
  total_cars,
  total_damaged,
  total_used,
  total_dealers,
} from "../../assets/images/images";
import AddCars from "../../components/addCarSection/AddCars";
import { GlobalContext } from "../../context/GlobalContext";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const globalContext = useContext(GlobalContext);

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
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <SideNav />
        <div className={styles.nav_and_body}>
          <Nav />
          <div className={styles.body_container}>
            <Greeting />

            {/* Total Cards Below */}
            {globalContext.activeMenu === "dashboard" && (
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
            )}

            {/* Add car section */}
            {globalContext.activeMenu === "cars" && <AddCars />}

            {/* Add Account/setting Section */}
            {globalContext.activeMenu === "settings" && <SettingsSection />}

            {/* Adding Cars */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
