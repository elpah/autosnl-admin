import styles from "./show-modal.module.css";
import type { CSSProperties } from "react";

type ShowModalProps = {
  text: string;
  handleProceedClick: () => void;
  handleCancelClick: () => void;
  proceedColor?: CSSProperties["backgroundColor"];
  cancelColor?: CSSProperties["backgroundColor"];
  proceedHoverColor?: CSSProperties["backgroundColor"];
  cancelHoverColor?: CSSProperties["backgroundColor"];
};

const ShowModal = ({
  text,
  handleProceedClick,
  handleCancelClick,
  proceedColor,
  cancelColor,
  proceedHoverColor,
  cancelHoverColor,
}: ShowModalProps) => {
  return (
    <div className={styles.modal_dark_layer}>
      <div className={styles.box}>
        <p className={styles.paragraph}>{text}</p>
        <div className={styles.button_container}>
          <button
            className={`${styles.proceed} ${styles["proceed--custom"]}`}
            onClick={handleProceedClick}
            style={
              {
                "--proceed-color": proceedColor || "#039fe2",
                "--proceed-hover-color": proceedHoverColor || "#0ab5ff",
              } as React.CSSProperties
            }
          >
            Proceed
          </button>
          <button
            className={styles.cancel}
            onClick={handleCancelClick}
            style={
              {
                "--cancel-color": cancelColor || "#e0e0e0",
                "--cancel-hover-color": cancelHoverColor || "#d1cfcf",
              } as React.CSSProperties
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
