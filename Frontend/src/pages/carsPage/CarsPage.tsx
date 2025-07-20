import { useRef, useState } from "react";
import CarList from "../../components/cars-section/CarList";
import DashboardLayout from "../../components/dashboard-layout/DashboardLayout";
import ShowModal from "../../components/show-modal/ShowModal";
import useDeleteCar from "../../hooks/useDeleteCar";
import { useParams } from "react-router-dom";
import usePermanentDeleteCar from "../../hooks/useDeletePermanentDelete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cardIdToDelete, setCarIdToDelete] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<"softDelete" | "hardDelete">(
    "softDelete"
  );
  const refetchFnRef = useRef<() => void>(() => {});

  const text = `Are you sure you want to delete car ${
    modalMode === "hardDelete" ? "Permanently" : ""
  }?`;
  const { type } = useParams();
  const currentType =
    type === "available" || type === "deleted" ? type : "available";

  const notifySuccess = () => {
    toast.success("Car Deleted Successfully.", {});
  };

  const notifyError = (message: string) => {
    toast.error(message, {});
  };

  const { mutate: deleteCar } = useDeleteCar();
  const { mutate: deletePermanently } = usePermanentDeleteCar();

  const handleDeleteForever = () => {
    setShowModal(false);
    if (!cardIdToDelete) return;

    deletePermanently(cardIdToDelete, {
      onSuccess: () => {
        notifySuccess();
        setCarIdToDelete(null);
        refetchFnRef.current?.();
      },
      onError: (error: any) => {
        notifyError(error.message);
        setCarIdToDelete(null);
      },
    });
  };
  const handleProceedClick = () => {
    setShowModal(false);
    if (!cardIdToDelete) return;

    deleteCar(cardIdToDelete!, {
      onSuccess: () => {
        notifySuccess();
        setCarIdToDelete(null);
        refetchFnRef.current?.();
      },
      onError: (error: any) => {
        notifyError(error.message);
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
          setRefetchFn={(fn) => {
            refetchFnRef.current = fn;
          }}
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
