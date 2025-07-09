import { useState } from "react";

import PasswordInput from "../passwordInput/PasswordInput";
import styles from "./settings-section.module.css";
const SettingsSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Account Settings</h2>
        <div className={styles.image_container_wrapper}>
          <div className={styles.image_container}>
            <img
              className={styles.image}
              src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D"
              alt="profile photo"
            />
            <div className={styles.icon_text}>
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              <p className={styles.upload_text}>Upload Photo</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <form className={styles.personal_info}>
          <label htmlFor="">Full name</label>
          <div className={styles.names_container}>
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Enter your Username" />
          <label htmlFor="">Email</label>
          <input type="text" name="" id="" placeholder="Enter your email" />
          <button>Save changes</button>
        </form>
        <form className={styles.password_reset}>
          <h2>Change Password</h2>
          <label htmlFor="">Current Password</label>
          <PasswordInput
            placeholder="Enter Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label htmlFor="">New Password</label>
          <PasswordInput
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label htmlFor="">Confirm Password</label>
          <PasswordInput
            placeholder="Enter New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsSection;
