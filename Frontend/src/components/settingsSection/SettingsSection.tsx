import { useContext, useState } from "react";
import PasswordInput from "../passwordInput/PasswordInput";
import styles from "./settings-section.module.css";
import { GlobalContext, type IUser } from "../../context/GlobalContext";
const SettingsSection = () => {
  const globalContext = useContext(GlobalContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [userInfo, setUserInfo] = useState<IUser>(globalContext.loggedUser);

  const handleChange = (field: keyof IUser, value: string | File) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>Account Settings</h2>
        <div className={styles.image_container_wrapper}>
          <div className={styles.image_container}>
            <img
              className={styles.image}
              src={
                typeof userInfo.profileImage === "string"
                  ? userInfo.profileImage
                  : userInfo.profileImage
                  ? URL.createObjectURL(userInfo.profileImage)
                  : undefined
              }
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
            <input
              value={userInfo.firstname}
              type="text"
              placeholder="First name"
              onChange={(e) => handleChange("firstname", e.target.value)}
            />
            <input
              value={userInfo.lastname}
              type="text"
              placeholder="Last name"
              onChange={(e) => handleChange("lastname", e.target.value)}
            />
          </div>
          {/* <label htmlFor="">Username</label>
          <input type="text" placeholder="Enter your Username" /> */}
          <label htmlFor="">Email</label>
          <input
            value={userInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="text"
            name=""
            id=""
            placeholder="Enter your email"
          />
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
