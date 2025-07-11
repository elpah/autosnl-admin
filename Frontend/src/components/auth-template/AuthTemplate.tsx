import AuthSocials from "../auth-socials/AuthSocials";
import styles from "./auth-template.module.css";

type IAuthTemplateProps = {
  logoHeader: string;
  subText: string;
  orText:string;
  subSpanText: string;
  children: React.ReactNode;
  handleSubSpanClick:()=>void;
};
const AuthTemplate = ({
  logoHeader,
  subText,
  orText,
  subSpanText,
  children,
  handleSubSpanClick
  
}: IAuthTemplateProps) => {
  return (
    <div className={styles.left}>
      <div className={styles.logo_container}>
        <h1 className={styles.logo_text}>{logoHeader}</h1>
      </div>
      <div className={styles.body_container}>
        {children}
        <div className={styles.or_container}>
          <span className={styles.line}></span>
          <span className={styles.or_text}>{orText}</span>
          <span className={styles.line}></span>
        </div>
        <AuthSocials />
        <p className={styles.create_account}>
          {subText}
          <span className={styles.sign_up} onClick={handleSubSpanClick}>{subSpanText}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthTemplate;
