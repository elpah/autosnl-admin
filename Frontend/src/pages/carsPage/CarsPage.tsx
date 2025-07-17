import { useContext, useEffect, useState } from "react";
import CarList from "../../components/cars-section/CarList";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import ShowModal from "../../components/show-modal/ShowModal";
import useDeleteCar from "../../hooks/useDeleteCar";
import { useParams } from "react-router-dom";
import usePermanentDeleteCar from "../../hooks/useDeletePermanentDelete";

const CarsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cardIdToDelete, setCarIdToDelete] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"softDelete" | "hardDelete">(
    "softDelete"
  );
  const [refetchFn, setRefetchFn] = useState<() => void>(() => () => {});

  const text = `Are you sure you want to delete car ${
    modalMode === "hardDelete" ? "Permanently" : ""
  }?`;
  const { type } = useParams();
  const currentType =
    type === "available" || type === "deleted" ? type : "available";

  const { mutate: deleteCar, isPending, isError, isSuccess } = useDeleteCar();
  const {
    mutate: deletePermanently,
    isPending: permDeleteIsPending,
    isError: permDeleteIsError,
    isSuccess: permDeleteIsSuccess,
  } = usePermanentDeleteCar();

  const handleDeleteForever = () => {
    setShowModal(false);
    if (!cardIdToDelete) return;

    deletePermanently(cardIdToDelete, {
      onSuccess: () => {
        // Show success toast message
        alert("deleted Permanently");
        setCarIdToDelete(null);
        refetchFn(); 

        // toast.success("Car recommended successfully!");
      },
      onError: (error: any) => {
        // Show error toast message if mutation fails
        // toast.error("Error recommending the car!");
        alert("failed to delete");
        setCarIdToDelete(null);
      },
    });
  };
  const handleProceedClick = () => {
    setShowModal(false);
    if (!cardIdToDelete) return;

    deleteCar(cardIdToDelete!, {
      onSuccess: () => {
        // Show success toast message
        alert("delete success");
        setCarIdToDelete(null);
        refetchFn(); 

        // toast.success("Car recommended successfully!");
      },
      onError: (error: any) => {
        // Show error toast message if mutation fails
        // toast.error("Error recommending the car!");
        alert("failed to delete");
        setCarIdToDelete(null);
      },
    });
  };

  return (
    <>
      {showModal && (
        <ShowModal
          handleProceedClick={
            modalMode === "softDelete"
              ? handleProceedClick
              : handleDeleteForever
          }
          text={text}
          handleCancelClick={() => setShowModal(false)}
          proceedColor={"red"}
          proceedHoverColor={"#e40404"}
          cancelColor={"#039fe2"}
          cancelHoverColor={"#0ab5ff"}
        />
      )}
      <DashboardLayout>
        <CarList
          setRefetchFn={setRefetchFn}
          setShowModal={setShowModal}
          setModalMode={setModalMode}
          setCarIdToDelete={setCarIdToDelete}
          currentType={currentType}
        />
      </DashboardLayout>
    </>
  );
};

export default CarsPage;
