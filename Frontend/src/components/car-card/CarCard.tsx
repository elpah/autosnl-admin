import styles from "./car-card.module.css";

type CarCardProps = {
  brand: string;
  model: string;
  dealer: string;
  price: string;
  imageSrc:string;
  handleEditClick:(id:string)=>void;
};
const CarCard = ({ brand, model, dealer, price,imageSrc,handleEditClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          src={imageSrc}
          alt="Car Photo"
        />
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
        <div className={styles.buttons}>
          <div className={styles.edit_delete_button}>
          <button className={styles.edit_button} onClick={handleEditClick}>Edit</button>
            <button className={styles.delete_button}>Delete</button>
          </div>
          <button className={styles.recommend_button}>
            Add To Recommended
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
