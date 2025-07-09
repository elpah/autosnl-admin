import styles from "./auth-button.module.css";

type IButtonProps = {
  text: string;
};
const AuthButton = ({ text }: IButtonProps) => {
  return <button className={styles.auth_button}>{text}</button>;
};

export default AuthButton;
