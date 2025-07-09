import styles from "./total-card.module.css";

type ITotalCardProps = {
  image: string;
  header: string;
  total_text: string;
};
const TotalCard = ({ image, header, total_text }: ITotalCardProps) => {
  return (
    <div className={styles.card_container}>
      <img className={styles.image} src={image} alt="icon" />
      <div className={styles.header_text_container}>
        <h2 className={styles.total_number}>{header}</h2>
        <p className={styles.total_text}>{total_text}</p>
      </div>
    </div>
  );
};

export default TotalCard;
