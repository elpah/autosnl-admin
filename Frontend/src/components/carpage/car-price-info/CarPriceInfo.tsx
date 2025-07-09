import styles from "./car-price-info.module.css";

type CarPriceInfoProps = {
  carNameModel: string;
  inc_btw_price: string;
  excl_btw_price: string;
  excl_bpm_btw_price: string;
};

const CarPriceInfo = ({
  carNameModel,
  inc_btw_price,
  excl_btw_price,
  excl_bpm_btw_price,
}: CarPriceInfoProps) => {
  return (
    <div className={styles.car_price_container}>
      <div className={styles.price_header}>{carNameModel}</div>
      <div className={styles.inc_btw_price_container}>
        <div className={styles.inc_btw_price}>{inc_btw_price}€</div>
        <div className={styles.inc_btw_price_text}>incl VAT</div>
      </div>
      <div
        className={`${styles.sub_price_container} ${styles.excl_btw_price_container}`}
      >
        <div className={`${styles.sub_price} ${styles.excl_btw_price}`}>
          {excl_btw_price}€
        </div>
        <div
          className={`${styles.sub_price_text} ${styles.excl_btw_price_text}`}
        >
          exc VAT
        </div>
      </div>
      <div
        className={` ${styles.sub_price_container} ${styles.excl_bpm_price_container}`}
      >
        <div className={`${styles.sub_price} ${styles.excl_bpm_btw_price}`}>
          {excl_bpm_btw_price}€
        </div>
        <div
          className={`${styles.sub_price_text} ${styles.excl_bpm_btw_price_text}`}
        >
          exc BPM
        </div>
      </div>
    </div>
  );
};

export default CarPriceInfo;
