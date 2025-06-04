import styles from "./auth-cocials.module.css";
import {fb_icon, google_icon }from "../../assets/images/images";

const AuthSocials = () => {
  return (
    <div className={styles.socials_div_container}>
      <div className={styles.socials_button}>
        <div className={styles.icon_container}>
          <img src={fb_icon} alt="facebook icon" />
        </div>
        <p className={styles.buttonName}>Facebook</p>
      </div>
      <div className={styles.socials_button}>
        <div className={styles.icon_container}>
          <img src={google_icon} alt="google icon" />
        </div>
        <p className={styles.buttonName}>Google</p>
      </div>
    </div>
  );
};
export default AuthSocials;
