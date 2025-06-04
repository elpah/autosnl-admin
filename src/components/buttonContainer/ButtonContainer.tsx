import styles from "./button-container.module.css";
type ButtonProps = {
  handleNextClick: () => void;
  handlePreviousClick: () => void;
};
const ButtonContainer = ({
  handleNextClick,
  handlePreviousClick,
}: ButtonProps) => {
  return (
    <div className={styles.container}>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleNextClick();
        }}
        className={styles.save}
      >
        Save & Next
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePreviousClick();
        }}
        className={styles.previous}
      >
        Previous
      </button>
    </div>
  );
};

export default ButtonContainer;
