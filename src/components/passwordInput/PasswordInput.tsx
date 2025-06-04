import { useState } from "react";
import styles from "./password-input.module.css" 

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.password_wrapper}>
      <input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span
        className={styles.eye_icon}
        onClick={() => setVisible((v) => !v)}
        role="button"
        aria-label="Toggle password visibility"
      >
           <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 7C7.91992 7 5.1716 10.5514 4.29842 11.8582C4.10438 12.1486 4.10438 12.5181 4.29842 12.8085C5.1716 14.1153 7.91992 17.6667 12 17.6667C16.0801 17.6667 18.8284 14.1153 19.7016 12.8085C19.8956 12.5181 19.8956 12.1486 19.7016 11.8582C18.8284 10.5514 16.0801 7 12 7Z"
            stroke="#434242"
          />
          <path
            d="M14.6667 12.3333C14.6667 13.8061 13.4728 15 12 15C10.5273 15 9.33334 13.8061 9.33334 12.3333C9.33334 11.9309 9.4225 11.5492 9.58214 11.2071C9.83966 10.6552 10.2806 10.2061 10.8265 9.93808C11.1806 9.76426 11.5789 9.66666 12 9.66666C13.4728 9.66666 14.6667 10.8606 14.6667 12.3333Z"
            stroke="#434242"
          />
        </svg>
      </span>
    </div>
  );
};

export default PasswordInput;
