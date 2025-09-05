import styles from "./car-card.module.css";

type CarCardProps = {
  carId: string;
  brand: string;
  model: string;
  dealer: string;
  price: string;
  imageSrc: string | File;
  recommendText: string;
  handleEditClick: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  handleRecommendClick: (id: string) => void;
  handleRestore: (id: string) => void;
  handleDeleteForever: (id: string) => void;
  deletedButtons: boolean;
  availableButtons: boolean;
};
const CarCard = ({
  carId,
  brand,
  model,
  dealer,
  price,
  imageSrc,
  recommendText,
  handleEditClick,
  handleDeleteClick,
  handleRecommendClick,
  handleRestore,
  handleDeleteForever,
  deletedButtons,
  availableButtons,
}: CarCardProps) => {
  const imageUrl =
    imageSrc instanceof File ? URL.createObjectURL(imageSrc) : imageSrc;

  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img src={imageUrl} alt="Car Photo" />
      </div>
      <div className={styles.car_info_container}>
        <div className={styles.infos}>
          <div className={styles.name_dealer_info}>
            <h2 className={styles.name_model}>
              {brand} {model}
            </h2>
            <p className={styles.dealer}>
              Dealer: <span className={styles.dealer_name}>{dealer}</span>
            </p>
          </div>
          <p className={styles.price}>€{price}</p>
        </div>
        {availableButtons && (
          <div className={styles.buttons}>
            <div className={styles.edit_delete_button}>
              <button
                className={styles.edit_button}
                onClick={() => handleEditClick(carId)}
              >
                Edit
              </button>
              <button
                className={styles.delete_button}
                onClick={() => {
                  handleDeleteClick(carId);
                }}
              >
                Delete
              </button>
            </div>
            <button
              className={styles.recommend_button}
              onClick={() => handleRecommendClick(carId)}
            >
              {recommendText}
            </button>
          </div>
        )}
        {deletedButtons && (
          <div className={`${styles.delete_restore_buttons} ${styles.buttons}`}>
            <button
              className={styles.restore}
              onClick={() => handleRestore(carId)}
            >
              Restore
            </button>
            <button
              className={styles.delete_forever}
              onClick={() => handleDeleteForever(carId)}
            >
              Delete Forever
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
