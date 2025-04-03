import AuthSocials from "../authSocials/AuthSocials";
import styles from "./auth-template.module.css";

type IAuthTemplateProps = {
  logoHeader: string;
  signInUpHeader: string;
  signInUpText: string;
  subText: string;
  subSpanText: string;
  children: React.ReactNode;
};
const AuthTemplate = ({
  logoHeader,
  signInUpHeader,
  signInUpText,
  subText,
  subSpanText,
  children,
}: IAuthTemplateProps) => {
  return (
    <div className={styles.left}>
      <div className={styles.logo_container}>
        <h1 className={styles.logo_text}>{logoHeader}</h1>
      </div>
      <div className={styles.body_container}>
        <h2 className={styles.header}>{signInUpHeader}</h2>
        <p className={styles.paragraph}>{signInUpText}</p>
        {children}
        <p className={styles.or}>or</p>
       <AuthSocials/>
        <p className={styles.create_account}>
          {subText}
          <span className={styles.sign_up}>{subSpanText}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthTemplate;
