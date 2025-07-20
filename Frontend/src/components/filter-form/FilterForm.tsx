import { useContext, useEffect, useState } from "react";
import styles from "./filter-form.module.css";
import useBrandModel from "../../hooks/useBrandModel";
import { GlobalContext } from "../../context/GlobalContext";

const FilterForm = () => {
  const { data: brandModelData, isLoading, error } = useBrandModel();
  const globalContext = useContext(GlobalContext);
  const [search, setSearch] = useState("");

  const cars: string[] = [];
  if (brandModelData && brandModelData.brands) {
    for (const brandKey in brandModelData.brands) {
      const brand = brandModelData.brands[brandKey];
      const brandName = brand.name?.en || "";

      if (brandName) {
        cars.push(brandName);

        for (const modelKey in brand.models) {
          const model = brand.models[modelKey];
          const modelName = model.en || "";

          if (modelName.trim()) {
            cars.push(`${brandName} ${modelName}`);
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!search.trim() || !brandModelData?.brands) return;
    const lowerSearch = search.toLowerCase();
    let foundBrandKey = "";
    let foundModelKey = "";

    for (const brandKey in brandModelData.brands) {
      const brandObj = brandModelData.brands[brandKey];
      const brandName = brandObj.name?.en?.toLowerCase() || "";

      if (lowerSearch.startsWith(brandName)) {
        foundBrandKey = brandKey;

        for (const modelKey in brandObj.models) {
          const modelName = brandObj.models[modelKey].en?.toLowerCase() || "";
          const fullName = `${brandName} ${modelName}`.trim();

          if (lowerSearch === fullName) {
            foundModelKey = modelKey;
            break;
          }
        }
        break;
      }
    }
    if (foundBrandKey) {
      globalContext.setGetCarsParams((prev) => ({
        ...prev,
        brand: foundBrandKey,
        model: foundModelKey || "",
        pageNumber: 1,
      }));
    }
  }, [search, brandModelData]);

  useEffect(() => {
    globalContext.getCarsParams;
  }, [globalContext.getCarsParams]);

  return (
    <div className={styles.container}>
      <div className={styles.search_div}>
        <p className={styles.text}>Search:</p>
        <input
          list="car-options"
          type="text"
          placeholder="Search cars..."
          className={styles.search_input}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const match = cars.find((car) =>
                car.toLowerCase().startsWith(search.toLowerCase())
              );
              if (match) {
                setSearch(match);
              }
            }
          }}
        />
      </div>
      {isLoading ? <div>Loading options...</div> : null}
      {error ? <div>Error loading brand/model data.</div> : null}
      <datalist id="car-options">
        {cars.map((car, index) => (
          <option value={car} key={index} />
        ))}
      </datalist>
      <div className={styles.sort_div}>
        <p className={styles.text}>Sort by: price</p>
        <div className={styles.select_wrapper}>
          <select
            className={styles.select_input}
            value={globalContext.getCarsParams.sortBy}
            onChange={(e) => {
              const value = e.target.value as
                | "price_asc"
                | "price_desc"
                | "none";
              globalContext.setGetCarsParams((prev) => ({
                ...prev,
                sortBy: value,
                pageNumber: 1,
              }));
            }}
          >
            <option disabled>Price</option>
            <option value="none">None</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <select
            className={styles.select_input}
            value={globalContext.getCarsParams.category}
            onChange={(e) => {
            
              globalContext.setGetCarsParams((prev) => ({
                ...prev,
                category: e.target.value,
                pageNumber: 1,
              }));
            }}
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="all">All</option>
            <option value="used">Used</option>
            <option value="damaged">Damaged</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
