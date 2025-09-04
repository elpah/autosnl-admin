import PageNumber from "../pageNumber/PageNumber";
import CarCard from "../car-card/CarCard";
import FilterForm from "../filter-form/FilterForm";
import TableHeader from "../tableHead/TableHeader";
import CarButton from "../car-button/CarButton";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import useGetAllCars from "../../hooks/useGetAllCars";
import styles from "./carlist.module.css";
import useAddRecommend from "../../hooks/useAddRecommended";
import useRestoreCar from "../../hooks/useRestore";
import {
  GlobalContext,
  initialGetCarsParams,
} from "../../context/GlobalContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader/Loader";

type CarListProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCarIdToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  setModalMode: React.Dispatch<
    React.SetStateAction<"softDelete" | "hardDelete">
  >;
  currentType: "available" | "deleted";
  setRefetchFn: (fn: () => void) => void;
};
const CarList = ({
  setShowModal,
  setCarIdToDelete,
  setModalMode,
  setRefetchFn,
  currentType,
}: CarListProps) => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const notifySuccess = (message: string) => {
    toast.success(message, {});
  };

  const notifyError = (message: string) => {
    toast.error(message, {});
  };

  const { mutate } = useAddRecommend();
  const { mutate: restoreCar } = useRestoreCar();

  const {
    data: carData,
    isLoading: carDataIsLoading,
    isError: carDataIsError,
    refetch,
  } = useGetAllCars(globalContext.getCarsParams, currentType);

  const handlePrevClick = () => {
    if (globalContext.getCarsParams.pageNumber > 1) {
      globalContext.setGetCarsParams((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber - 1,
      }));
    }
  };

  const handleNextClick = () => {
    if (globalContext.getCarsParams.pageNumber < totalPages) {
      globalContext.setGetCarsParams((prev) => ({
        ...prev,
        pageNumber: prev.pageNumber + 1,
      }));
    }
  };

  const handlePageNumberClick = (number: number) => {
    globalContext.setGetCarsParams((prev) => ({
      ...prev,
      pageNumber: number,
    }));
  };

  const handleEditClick = (id: string) => {
    navigate(`/cars/edit/${id}`);
  };

  const openSoftDeleteModal = (id: string) => {
    setModalMode("softDelete");
    setCarIdToDelete(id);
    setShowModal(true);
  };

  const openHardDeleteModal = (id: string) => {
    setModalMode("hardDelete");
    setCarIdToDelete(id);
    setShowModal(true);
  };

  const handleRestore = (id: string) => {
    restoreCar(id, {
      onSuccess: () => {
        setCarIdToDelete(null);
        refetch();
        notifySuccess("Car Successfully Restored.");
      },
      onError: (error: any) => {
        notifyError(error.message);
        setCarIdToDelete(null);
      },
    });
  };

  const handleClick = (type: "available" | "deleted") => {
    globalContext.setGetCarsParams(initialGetCarsParams);
    navigate(`/cars/${type}`);
  };

  const handleRecommendClick = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
        notifySuccess("Recommend. Success");
      },
      onError: (error: any) => {
        notifyError(error.message);
      },
    });
  };
  const totalPages = carData ? Math.ceil(carData.totalCars / 30) : 1;

  const getPageNumbers = (totalPages: number): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  useEffect(() => {
    setRefetchFn(refetch);
  }, [refetch, setRefetchFn]);

  useEffect(() => {
    refetch();
  }, [currentType]);

  if (carDataIsError) notifyError("Error Loading Cars");

  return (
    <div className={styles.container}>
      <CarButton
        specialPlus={"+"}
        buttonText={"Add New Car"}
        handleButtonClick={() => {
          navigate("/add-car");
        }}
      />
      <div className={styles.categories}>
        <div className={styles.wrap_content}>
          <div className={styles.avail_delete_container}>
          <div
            onClick={() => handleClick("available")}
            className={`${styles.category_name} ${
              currentType === "available" ? styles.active : ""
            }`}
          >
            <p>Available Cars</p>
          </div>
          <div
            onClick={() => handleClick("deleted")}
            className={`${styles.category_name} ${
              currentType === "deleted" ? styles.active : ""
            }`}
          >
            <p>Deleted Cars</p>
          </div>
          </div>
       
        <FilterForm />
        </div>
      </div>

      <h2
        className={styles.current_search}
      >{`${globalContext.getCarsParams.brand.toUpperCase()} ${globalContext.getCarsParams.model.toUpperCase()}`}</h2>

      <div className={styles.cars_container}>
        <TableHeader />
        {carDataIsLoading && <Loader />}
        {carData?.cars.map((car) => (
          <CarCard
            key={car.carId!}
            carId={car.carId!}
            brand={car.lang.en.carBrand}
            model={car.lang.en.carModel}
            price={car.price_incl_btw.toString()}
            dealer={car.dealer ? car.dealer.toString() : ""}
            imageSrc={car.carImages[0]}
            recommendText={
              car.isRecommended === true ? "Unrecommended" : "Recommended"
            }
            handleEditClick={() => handleEditClick(car.carId!)}
            handleDeleteClick={() => openSoftDeleteModal(car.carId!)}
            handleRecommendClick={() => handleRecommendClick(car.carId!)}
            handleDeleteForever={() => openHardDeleteModal(car.carId!)}
            handleRestore={() => handleRestore(car.carId!)}
            deletedButtons={currentType === "deleted"}
            availableButtons={currentType === "available"}
          />
        ))}
      </div>
      <PageNumber
        currentPage={globalContext.getCarsParams.pageNumber}
        pageNumbers={getPageNumbers(totalPages)}
        totalPages={totalPages}
        handlePrevClick={() => handlePrevClick()}
        handleNextClick={() => handleNextClick()}
        handlePageNumberClick={handlePageNumberClick}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="colored"
        toastStyle={{
          fontSize: "14px",
        }}
      />
    </div>
  );
};

export default CarList;
