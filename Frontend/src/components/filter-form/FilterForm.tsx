import { useState } from "react";
import styles from "./filter-form.module.css";

const FilterForm = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.search_div}>
        <p className={styles.text}>Search:</p>
        <input
          type="text"
          placeholder="Search cars..."
          className={styles.search_input}
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.sort_div}>
        <p className={styles.text}>Sort by:</p>
        <div className={styles.select_wrapper}>
        <select
          className={styles.select_input}
          // value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>Price</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <select
          className={styles.select_input}
          // value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="" disabled>
            Filter
          </option>
          <option value="recommended">Recommended</option>
          <option value="newest">Newest</option>
        </select>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
