import { useContext } from "react";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import { GlobalContext } from "../../context/GlobalContext";
import AddCars from "../../components/add-car-section/AddCars";

const AddCarPage = () => {
  return (
    <DashboardLayout>
      <AddCars />
    </DashboardLayout>
  );
};

export default AddCarPage;
