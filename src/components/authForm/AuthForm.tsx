import styles from "./auth-form.module.css";

type IAuthFormProps = {
  subText?: string;
  children: React.ReactNode;
  showNameField?: boolean;
};

const AuthForm = ({ subText, showNameField, children }: IAuthFormProps) => {
  return (
    <form className={styles.form_container} action="">
      {showNameField && (
        <input
          className={styles.input_Name}
          type="text"
          placeholder="Full Name"
        />
      )}
      <input className={styles.input_email} type="text" placeholder="Email" />
      <input
        className={styles.input_password}
        type="password"
        placeholder="Password"
      />
      <p className={styles.forgot_password}>{subText}</p>
      {children}
    </form>
  );
};

export default AuthForm;
