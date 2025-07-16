import styles from "./show-modal.module.css";

type ShowModalProps = {
  text: string;
  handleProceedClick: () => void;
  handleCancelClick: () => void;
};

const ShowModal = ({
  text,
  handleProceedClick,
  handleCancelClick,
}: ShowModalProps) => {
  return (
    <div className={styles.modal_dark_layer}>
      <div className={styles.box}>
        <p className={styles.paragraph}>{text}</p>
        <div className={styles.button_container}>
          <button className={styles.proceed} onClick={handleProceedClick}>
            Proceed
          </button>
          <button className={styles.cancel} onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
