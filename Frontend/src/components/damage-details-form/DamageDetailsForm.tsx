import { useContext } from "react";
import styles from "./damage-details-form.module.css";
import { CarDamage, GlobalContext } from "../../context/GlobalContext";

interface DamageDetail {
  title: string;
  text: string;
}

const DamageDetailForm = () => {
  const globalContext = useContext(GlobalContext);

  const lang = globalContext.carData.lang[globalContext.currentLanguage];
  const carDamageDetails = lang?.carDamageDetails || [];

  const handleInputChange = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    globalContext.setCarData((prev) => {
      const updatedCarDamageDetails = [...carDamageDetails];
      updatedCarDamageDetails[index] = {
        ...updatedCarDamageDetails[index],
        [field]: value,
      };

      return {
        ...prev,
        lang: {
          ...prev.lang,
          [globalContext.currentLanguage]: {
            ...lang,
            carDamageDetails: updatedCarDamageDetails,
          },
        },
      };
    });
  };

  const handleAddNewInputGroup = () => {
    globalContext.setCarData((prev) => {
      const updatedCarDamageDetails = [
        ...carDamageDetails,
        { title: "", text: "" },
      ];

      return {
        ...prev,
        lang: {
          ...prev.lang,
          [globalContext.currentLanguage]: {
            ...lang,
            carDamageDetails: updatedCarDamageDetails,
          },
        },
      };
    });
  };
  const handleDelete = (index: number) => {
    const carData = globalContext.carData;
    const lang = carData.lang[globalContext.currentLanguage];

    if (lang?.carDamageDetails) {
      const updatedDamageDetails = lang.carDamageDetails.filter(
        (_: CarDamage, i: number) => i !== index
      );

      globalContext.setCarData((prev) => ({
        ...prev,
        lang: {
          ...prev.lang,
          [globalContext.currentLanguage]: {
            ...lang,
            carDamageDetails: updatedDamageDetails,
          },
        },
      }));
    }
  };

  return (
    <div className={styles.container}>
      {carDamageDetails.map((input: DamageDetail, index: number) => (
        <div key={index} className={styles.details}>
          <label>Damage Detail Title {index + 1}</label>
          <input
            type="text"
            value={input.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
          />
          <label>Damage Detail Text {index + 1}</label>
          {/* <input
            type="text"
            value={input.text}
            onChange={(e) => handleInputChange(index, "text", e.target.value)}
          /> */}

		  <textarea className={styles.textarea}
		   value={input.text}
		   onChange={(e) => handleInputChange(index, "text", e.target.value)}
		  ></textarea>
          <button className={styles.delete} onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddNewInputGroup}>
        Add new detail +
      </button>
    </div>
  );
};

export default DamageDetailForm;
