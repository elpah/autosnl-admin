import styles from "./info-card.module.css";

type InfoProps = {
  value: string;
  icon: string;
};

export const InfoCard = ({ value, icon }: InfoProps) => {
  return (
    <div className={styles.contact_card_container}>
      <div className={styles.contact_image_container}>
        <img className={styles.contact_image} src={icon} alt="temporary" />
      </div>
      <div className={styles.contact_info}>{value}</div>
    </div>
  );
};
