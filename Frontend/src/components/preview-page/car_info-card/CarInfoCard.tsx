import styles from "./car_info_card.module.css";

type CardInfoProps = {
  bg: boolean;
  card_icon: string;
  card_header: string;
  card_value: string;
};
export const CarInfoCard = ({
  bg,
  card_icon,
  card_header,
  card_value,
}: CardInfoProps) => {
  return (
    <div
      className={`${bg ? styles.blue_bg_container : ""} ${
        styles.info_card_container
      }`}
    >
      <div className={styles.image_container}>
        <img className={styles.info_image} src={card_icon} alt="info icon" />
      </div>
      <div className={styles.header_detail_container}>
        <h2
          className={`${bg ? styles.blue_bg_header : ""} ${
            styles.detail_header
          }`}
        >
          {card_header}
        </h2>
        <p
          className={`${bg ? styles.blue_bg_details_info : ""} ${
            styles.detail_info
          }`}
        >
          {card_value}
        </p>
      </div>
    </div>
  );
};
