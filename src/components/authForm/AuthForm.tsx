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
        <>
          {/* <label className={styles.label} htmlFor="fullName">
            Full Name
          </label> */}
          <input
            className={styles.input_Name}
            type="text"
            placeholder="Enter your name"
          />
        </>
      )}
      {/* <label className={styles.label} htmlFor="email">
        Email
      </label> */}
      <input
        className={styles.input_email}
        type="text"
        placeholder="Example@example.com"
      />
      {/* <label className={styles.label} htmlFor="password">
        Password
      </label> */}
      <input
        className={styles.input_password}
        type="password"
        placeholder="Enter your password"
      />
      <p className={styles.forgot_password}>{subText}</p>
      {children}
    </form>
  );
};

export default AuthForm;
