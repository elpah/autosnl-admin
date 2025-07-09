import styles from "./car-card.module.css";

const CarCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Car Photo"
        />
      </div>
      <div className={styles.car_info_container}>
        <div className={styles.infos}>
          <div className={styles.name_dealer_info}>
            <h2 className={styles.name_model}>Mercedes Benz c300</h2>
            <p className={styles.dealer}>
              Dealer: <span className={styles.dealer_name}>Elpah Motos</span>
            </p>
          </div>
          <p className={styles.price}>$50000</p>
        </div>
        <div className={styles.buttons}>
          <div className={styles.edit_delete_button}>
            <button className={styles.edit_button}>Edit</button>
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
