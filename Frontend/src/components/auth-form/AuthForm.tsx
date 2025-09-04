import styles from "./auth-form.module.css";

export type LoginInfo = {
  username?: string;
  email: string;
  password: string;
};

type IAuthFormProps = {
  subText?: string;
  children: React.ReactNode;
  showNameField?: boolean;
  loginInfo: LoginInfo;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfo>>;
  errorMessage: string;
};

const AuthForm = ({
  subText,
  showNameField,
  children,
  loginInfo,
  setLoginInfo,
  errorMessage,
}: IAuthFormProps) => {
  const handleInputChange =
    (field: keyof LoginInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <form className={styles.form_container} action="">
      {showNameField && (
        <input
          className={styles.input_Name}
          type="text"
          placeholder="Enter your name"
          value={loginInfo.username || ""}
          onChange={handleInputChange("username")}
        />
      )}
      <input
        className={styles.input_email}
        type="text"
        placeholder="Example@example.com"
        value={loginInfo.email || ""}
        onChange={handleInputChange("email")}
      />
      <input
        className={styles.input_password}
        type="password"
        placeholder="Enter your password"
        value={loginInfo.password || ""}
        onChange={handleInputChange("password")}
      />
      <p className={styles.forgot_password}>{subText}</p>
      {children}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};

export default AuthForm;
