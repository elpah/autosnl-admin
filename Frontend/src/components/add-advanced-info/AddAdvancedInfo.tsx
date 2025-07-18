import { useContext} from "react";
import { GlobalContext, type ICarData } from "../../context/GlobalContext";
import styles from "./add-advanced-info.module.css";
import ImageUploader from "../image-uploader/ImageUploader";

const AddAdvancedInfo = () => {
  const globalContext = useContext(GlobalContext);
  const updateAdvancedField = (field: keyof ICarData, value: any) => {
    globalContext.setCarData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <ImageUploader />
      <div className={`${styles.form_field} ${styles.mileage}`}>
        <label htmlFor="mileage">Mileage</label>
        <input
          value={globalContext.carData.carMileage}
          onChange={(e) => updateAdvancedField("carMileage", e.target.value)}
          name="mileage"
          id="mileage"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.power}`}>
        <label htmlFor="power">Power</label>
        <input
          value={globalContext.carData.carPower}
          onChange={(e) => updateAdvancedField("carPower", e.target.value)}
          name="power"
          id="power"
          type="text"
        />
      </div>
      <div className={`${styles.form_field} ${styles.engine_capacity}`}>
        <label htmlFor="engine-capacity">Engine Capacity</label>
        <input
          value={globalContext.carData.carEngineCapacity}
          onChange={(e) =>
            updateAdvancedField("carEngineCapacity", e.target.value)
          }
          name="engine-capacity"
          id="engine-capacity"
          type="text"
        />
      </div>
      <div className={`${styles.form_field} ${styles.erd}`}>
        <label htmlFor="erd">ERD</label>
        <input
          value={globalContext.carData.carERD}
          onChange={(e) => updateAdvancedField("carERD", e.target.value)}
          name="erd"
          id="erd"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.mod_till}`}>
        <label htmlFor="mod">Mod Till</label>
        <input
          value={globalContext.carData.carMODTill}
          onChange={(e) => updateAdvancedField("carMODTill", e.target.value)}
          name="mod"
          id="mod"
          type="text"
          placeholder="2022-12-24"
        />
      </div>
      <div className={`${styles.form_field} ${styles.price_incl_btw}`}>
        <label htmlFor="price-incl-btw">Price (incl btw)</label>
        <input
          value={globalContext.carData.price_incl_btw}
          onChange={(e) =>
            updateAdvancedField("price_incl_btw", e.target.value)
          }
          name="price-incl-btw"
          id="price-incl-btw"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.price_excl_btw}`}>
        <label htmlFor="price-excl-btw">Price (excl btw)</label>
        <input
          value={globalContext.carData.price_excl_btw}
          onChange={(e) =>
            updateAdvancedField("price_excl_btw", e.target.value)
          }
          name="price-excl-btw"
          id="price-excl-btw"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.price_excl_bpm}`}>
        <label htmlFor="price-excl-bpm">Price (excl bpm)</label>
        <input
          value={globalContext.carData.price_excl_bpm}
          onChange={(e) =>
            updateAdvancedField("price_excl_bpm", e.target.value)
          }
          name="price-excl-bpm"
          id="price-incl-bpm"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.vat}`}>
        <label htmlFor="vat">Vat</label>
        <input
          onChange={(e) => updateAdvancedField("carVat", e.target.value)}
          name="vat"
          id="vat"
          type="number"
        />
      </div>
      <div className={`${styles.form_field} ${styles.weight}`}>
        <label htmlFor="weight">Weight</label>
        <input
          value={globalContext.carData.carWeight}
          onChange={(e) => updateAdvancedField("carWeight", e.target.value)}
          name="weight"
          id="weight"
          type="text"
        />
      </div>
      <div className={`${styles.form_field} ${styles.number_of_doors}`}>
        <label htmlFor="num-of-doors">Number Of Doors</label>
        <input
          value={globalContext.carData.carNumberOfDoors}
          onChange={(e) =>
            updateAdvancedField("carNumberOfDoors", e.target.value)
          }
          name="num-of-door"
          id="num-of-doors"
          type="text"
        />
      </div>
    </div>
  );
};

export default AddAdvancedInfo;
