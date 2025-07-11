import styles from "./car-button.module.css"

type ButtonProps = {
  handleButtonClick: ()=>void;
  specialPlus?:string;
  buttonText:string;
}
const CarButton = ({handleButtonClick,specialPlus,buttonText}:ButtonProps) => {
  return (
    <button className={styles.button} onClick={handleButtonClick}>
      <span className={styles.plus}>{specialPlus}</span>{buttonText}
    </button>
  );
};

export default CarButton;
