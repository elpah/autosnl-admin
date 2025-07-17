import PageNumber from "../pageNumber/PageNumber";
import CarCard from "../car-card/CarCard";
import FilterForm from "../filter-form/FilterForm";
import TableHeader from "../tableHead/TableHeader";
import CarButton from "../car-button/CarButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetAllCars from "../../hooks/useGetAllCars";
import styles from "./carlist.module.css";
import useAddRecommend from "../../hooks/useAddRecommended";
import useRestoreCar from "../../hooks/useRestore";

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
  const [currentPage, setCurrentPage] = useState(1);

  const { mutate, isPending, isError, isSuccess } = useAddRecommend();
  const {
    mutate: restoreCar,
    isPending: restoreIsPending,
    isError: restoreIsError,
    isSuccess: restoreIsSuccess,
  } = useRestoreCar();

  const {
    data: carData,
    isLoading,
    error,
    refetch,
  } = useGetAllCars(currentPage, currentType);

  let totalPages;
  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageNumberClick = (number: number) => {
    setCurrentPage(number);
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
        // Show success toast message
        alert("Car Successfully Restored");
        setCarIdToDelete(null);
        refetch();

        // toast.success("Car recommended successfully!");
      },
      onError: (error: any) => {
        // Show error toast message if mutation fails
        // toast.error("Error recommending the car!");
        alert("failed to restore Car");
        setCarIdToDelete(null);
      },
    });
  };

  const handleClick = (type: "available" | "deleted") => {
    navigate(`/cars/${type}`);
  };

  const handleRecommendClick = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        // Show success toast message
        refetch();
        alert("success");
        // toast.success("Car recommended successfully!");
      },
      onError: (error: any) => {
        // Show error toast message if mutation fails
        // toast.error("Error recommending the car!");
        alert("failed");
      },
    });
  };

  useEffect(() => {
    setRefetchFn(() => refetch);
  }, [refetch]);

  useEffect(() => {
    refetch();
  }, [currentType]);

  if (isLoading) return <div>is loading...</div>;

  if (carData) {
    totalPages = carData.totalCars / 30;
  }
  const getPageNumbers = (totalPages: number): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

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
      <div className={styles.cars_container}>
        <TableHeader />
        {carData?.cars.map((car) => (
          <CarCard
            carId={car.carId}
            brand={car.lang.en.carBrand}
            model={car.lang.en.carModel}
            price={car.price_incl_btw.toString()}
            dealer={car.dealer.toString()}
            imageSrc={car.carImages[0]}
            recommendText={
              car.isRecommended === true ? "Unrecommended" : "Recommended"
            }
            handleEditClick={() => handleEditClick(car.carId)}
            handleDeleteClick={() => openSoftDeleteModal(car.carId)}
            handleRecommendClick={() => handleRecommendClick(car.carId)}
            handleDeleteForever={() => openHardDeleteModal(car.carId)}
            handleRestore={() => handleRestore(car.carId)}
            deletedButtons={currentType === "deleted"}
            availableButtons={currentType === "available"}
          />
        ))}
      </div>
      <PageNumber
        currentPage={currentPage}
        pageNumbers={getPageNumbers(totalPages)}
        totalPages={totalPages}
        handlePrevClick={() => handlePrevClick()}
        handleNextClick={() => handleNextClick()}
        handlePageNumberClick={handlePageNumberClick}
      />
    </div>
  );
};

export default CarList;
