import PageNumber from "../pageNumber/PageNumber";
import CarCard from "../car-card/CarCard";
import FilterForm from "../filter-form/FilterForm";
import TableHeader from "../tableHead/TableHeader";
import CarButton from "../car-button/CarButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetAllCars from "../../hooks/useGetAllCars";
import styles from "./carlist.module.css";

const CarList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
  const { data: carData, isLoading, error } = useGetAllCars(currentPage);
  if (isLoading) return <div>is loading...</div>;

  if (carData) {
    totalPages = carData.totalCars / 30;
  }
  const getPageNumbers = (totalPages: number): number[] => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className={styles.container}>
      <CarButton specialPlus={"+"} buttonText={"Add New Car"} handleButtonClick={() => navigate("/add-car")} />
      <div className={styles.categories}>
        <div
          className={`${styles.category_name} ${1 > 0 ? styles.active : ""}`}
        >
          <p>Available Cars</p>
        </div>
        <div
          className={`${styles.category_name} ${1 < 0 ? styles.active : ""}`}
        >
          <p>Deleted Cars</p>
        </div>
      </div>
      <FilterForm />
      <div className={styles.cars_container}>
        <TableHeader />
        {carData?.cars.map((car) => (
          <CarCard
            brand={car.lang.en.carBrand}
            model={car.lang.en.carModel}
            price={car.price_incl_btw}
            dealer={car.dealer}
            imageSrc={car.carImages[0]}
            handleEditClick={() => handleEditClick(car.carId)}
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
