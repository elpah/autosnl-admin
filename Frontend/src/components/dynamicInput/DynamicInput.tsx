import { useContext, useState, useEffect } from "react";
import {
  GlobalContext,
  type CarOptionCategories,
} from "../../context/GlobalContext";

import styles from "./dynamic-input.module.css";

type DynamicInputProps = {
  label: string;
  optionKey: keyof CarOptionCategories;
};

const DynamicInput = ({ label, optionKey }: DynamicInputProps) => {
  const globalContext = useContext(GlobalContext);

  const [values, setValues] = useState<string[]>(
    globalContext.carData.lang[globalContext.currentLanguage].carOptions[
      optionKey
    ] || []
  );

  useEffect(() => {
    setValues(
      globalContext.carData.lang[globalContext.currentLanguage].carOptions[
        optionKey
      ] || []
    );
  }, [globalContext.carData, globalContext.currentLanguage, optionKey]);

  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
    updateGlobalContext(updated);
  };

  const addNewField = () => {
    const updated = [...values, ""];
    setValues(updated);
    updateGlobalContext(updated);
  };

  const updateGlobalContext = (newValues: string[]) => {
    globalContext.setCarData((prev) => ({
      ...prev,
      lang: {
        ...prev.lang,
        [globalContext.currentLanguage]: {
          ...prev.lang[globalContext.currentLanguage],
          carOptions: {
            ...prev.lang[globalContext.currentLanguage].carOptions,
            [optionKey]: newValues,
          },
        },
      },
    }));
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      {values.map((val, i) => (
        <input
          key={i}
          type="text"
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          placeholder={`${label} #${i + 1}`}
        />
      ))}
      <button type="button" onClick={addNewField}>
        Add new description +
      </button>
    </div>
  );
};

export default DynamicInput;
