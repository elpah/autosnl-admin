import styles from "./add-car-button.module.css"

const AddCarButton = () => {
  return (
    <button className={styles.button}>
      <span className={styles.plus}>+</span> Add Car
    </button>
  );
};

export default AddCarButton;
