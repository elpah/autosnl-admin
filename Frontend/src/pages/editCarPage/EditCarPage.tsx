import { useContext, useEffect } from "react";
import AddCars from "../../components/add-car-section/AddCars";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import useGetCarById from "../../hooks/useGetCarById";

const EditCarPage = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    globalContext.setCurrentAction("isEditing");
  }, []);

  useEffect(() => {
    if (!id) {
      navigate("/notfound");
    }
  }, [id, navigate]);

  const { data, isLoading, error } = useGetCarById(id as string);
  useEffect(() => {
    if (data) {
      globalContext.setCarData(data);
    }

    globalContext.setCarData((prev) => ({
      ...prev,
      dealer: {
        ...(typeof prev.dealer === "object" ? prev.dealer : {}),
        isOther: true,
      },
    }));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No car data found</div>;

  return (
    <DashboardLayout>
      <AddCars />
    </DashboardLayout>
  );
};

export default EditCarPage;
