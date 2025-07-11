import { useContext } from "react";
import CarPage from "../../components/preview-page/PreviewPage";
import CarList from "../../components/cars-section/CarList";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import SettingsSection from "../../components/settingsSection/SettingsSection";
import { GlobalContext } from "../../context/GlobalContext";
import AddCars from "../../components/add-car-section/AddCars";

const CarsPage = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <DashboardLayout>
      <CarList />
    </DashboardLayout>
  );
};

export default CarsPage;
