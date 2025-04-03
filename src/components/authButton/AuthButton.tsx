import styles from "./auth-button.module.css";

type IAuthButtonProps = {
  text: string;
};
const AuthButton = ({ text }: IAuthButtonProps) => {
  return <button className={styles.auth_button}>{text}</button>;
};

export default AuthButton;
