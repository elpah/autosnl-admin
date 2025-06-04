import PageNumber from "../pageNumber/PageNumber";
import CarCard from "../carCard/CarCard";
import FilterForm from "../filterForm/FilterForm";
import TableHeader from "../tableHead/TableHeader";
import AddCarButton from "../AddCarButton/AddCarButton";

import styles from "./cars-section.module.css";

const CarsSection = () => {
  return (
    <div className={styles.container}>
      <AddCarButton />
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
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
      <PageNumber totalPages={24} />
    </div>
  );
};

export default CarsSection;
