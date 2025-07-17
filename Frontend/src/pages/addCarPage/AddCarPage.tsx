import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import AddCars from "../../components/add-car-section/AddCars";

const AddCarPage = () => {
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    globalContext.setCurrentAction("isAdding");
  },[]);

  return (
    <DashboardLayout>
      <AddCars />
    </DashboardLayout>
  );
};

export default AddCarPage;
