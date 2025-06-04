import { useContext } from "react";
import styles from "./language-selector.module.css";
import { GlobalContext } from "../../context/GlobalContext";

const LanguageSelector = () => {
  const globalContext = useContext(GlobalContext);
  return (
    <div className={styles.language_selector}>
      <p> Select A Language</p>
      <div className={styles.language_div}>
        <p
          className={`${
            globalContext.currentLanguage === "en" ? styles.active : ""
          } `}
          onClick={() => globalContext.setCurrentLanguage("en")}
        >
          English 🇺🇸
        </p>
        <p
          className={`${
            globalContext.currentLanguage === "nl" ? styles.active : ""
          } `}
          onClick={() => globalContext.setCurrentLanguage("nl")}
        >
          Dutch 🇳🇱
        </p>
        <p
          className={`${
            globalContext.currentLanguage === "ru" ? styles.active : ""
          } `}
          onClick={() => globalContext.setCurrentLanguage("ru")}
        >
          Russian 🇷🇺
        </p>
        <p
          className={`${
            globalContext.currentLanguage === "ua" ? styles.active : ""
          } `}
          onClick={() => globalContext.setCurrentLanguage("ua")}
        >
          Ukrainian 🇺🇦
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
