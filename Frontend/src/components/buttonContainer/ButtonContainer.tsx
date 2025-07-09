import { useContext } from "react";
import styles from "./button-container.module.css";
import { GlobalContext } from "../../context/GlobalContext";
type ButtonProps = {
  handleNextClick: () => void;
  handlePreviousClick: () => void;
};
const ButtonContainer = ({
  handleNextClick,
  handlePreviousClick,
}: ButtonProps) => {
  const globalContext = useContext(GlobalContext);
  return (
    <div className={styles.container}>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNextClick();
        }}
        className={styles.save}
      >
        {globalContext.currentSelection === "Dealer" ? "Save" : "Next"}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePreviousClick();
        }}
        className={styles.previous}
        disabled={
          globalContext.currentSelection === "Basic" &&
          globalContext.currentLanguage === "en"
        }
      >
        Previous
      </button>
    </div>
  );
};

export default ButtonContainer;
