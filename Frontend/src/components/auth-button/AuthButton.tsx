import styles from "./auth-button.module.css";

type IButtonProps = {
  text: string;
  handleSubmit: (e: React.FormEvent) => void; };

const AuthButton = ({ text, handleSubmit }: IButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault;
        handleSubmit(e);
      }}
      className={styles.auth_button}
    >
      {text}
    </button>
  );
};

export default AuthButton;
