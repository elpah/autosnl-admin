import { damages_details } from "../../../assets/images/images";
import styles from "./car-damages-card-details.module.css";

type DamageDetail = {
  title: string;
  text: string;
};

type CarDamagesProps = {
  damages: DamageDetail[];
};
export const CarDamagesDetailsCard = ({ damages }: CarDamagesProps) => {
  return (
    <div className={styles.car_damages_container}>
      <div className={styles.header_img_container}>
        <div className={styles.damage_image_container}>
          <img
            className={styles.damage_img_icon}
            src={damages_details}
            alt="icon"
          />
        </div>
        <div className={styles.damages_header}> Damages Details</div>
      </div>
      <div className={styles.damages_info}>
        <ul className={styles.list_container_ol}>
          {damages.length > 0 ? (
            damages.map((damage, index) => (
              <li key={index} className={styles.list_item}>
                <p className={styles.list_title}>{damage.title}</p>
                <p className={styles.list_sub}>- {damage.text}</p>
              </li>
            ))
          ) : (
            <p>No Damages</p>
          )}
        </ul>
      </div>
    </div>
  );
};
