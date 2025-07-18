import { useContext, useEffect, useRef, useState } from "react";
import {
  hamburger_open,
  hamburger_close,
  bell_icon,
  profile_icon,
} from "../../assets/images/images";
import { GlobalContext } from "../../context/GlobalContext";

import styles from "./nav.module.css";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const globalContext = useContext(GlobalContext);

  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (navIsOpen && navRef.current) {
      disableBodyScroll(navRef.current);
    } else if (navRef.current) {
      enableBodyScroll(navRef.current);
    }

    return () => {
      if (navRef.current) {
        enableBodyScroll(navRef.current);
      }
    };
  }, [navIsOpen]);
  
  return (
    <header>
      <nav>
        <div className={styles.hamburger_container}>
          <div className={styles.greeting_name_container}>
            <p className={styles.greetings}>Good Morning</p>
            <h2 className={styles.name}>Elpah</h2>
          </div>
          <img
            onClick={() => setNavIsOpen(true)}
            className={styles.hamburger_icon}
            src={navIsOpen ? hamburger_close : hamburger_open}
            alt="Menu Toggle"
            width={30}
            height={30}
          />
        </div>
        <div className={styles.notification_profile_icons}>
          <div className={styles.notification_alert}>
            <img className={styles.notification_icon} src={bell_icon} alt="" />
            <p className={styles.notification_number}>20+</p>
          </div>

          <img
            className={styles.profile_icon}
            src={profile_icon}
            alt="profile picture"
          />
        </div>
      </nav>
      <div
        className={`${styles.menu_container} ${
          navIsOpen ? styles.menu_open : styles.menu_closed
        }`}
      >
        <div className={styles.logo_close_container}>
          <h2 className={styles.logo_text}>ZaurAutos</h2>
          <img
            onClick={() => setNavIsOpen(false)}
            src={hamburger_close}
            alt="close_icon"
          />
        </div>
        <ul className={styles.ul_container}>
          <li
            onClick={() => {
              globalContext.setActiveMenu("dashboard");
              setNavIsOpen(false);
            }}
            className={
              globalContext.activeMenu === "dashboard" ? styles.active : ""
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${
                globalContext.activeMenu === "dashboard"
                  ? styles.active_icon
                  : ""
              }`}
            >
              <path
                d="M4.125 19.5V12.75H9.375"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.375 19.5H2.625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.375 19.5V8.25H14.625"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.875 3.75H14.625V19.5H19.875V3.75Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Dashboard</p>
          </li>
          <li
            className={globalContext.activeMenu === "cars" ? styles.active : ""}
            onClick={() => {
              globalContext.setActiveMenu("cars");
              setNavIsOpen(false);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${
                globalContext.activeMenu === "cars"
                  ? styles.active_icon_others
                  : ""
              }`}
            >
              <path
                d="M15.84 4C16.3347 3.99998 16.8218 4.12232 17.2578 4.35611C17.6938 4.58991 18.0652 4.9279 18.339 5.34L18.444 5.512L20.438 9H21.6C21.6922 8.99998 21.7816 9.03182 21.853 9.09014C21.9245 9.14845 21.9736 9.22965 21.992 9.32L22 9.4V9.875C22.0001 10.0348 21.9524 10.191 21.8629 10.3234C21.7734 10.4559 21.6463 10.5585 21.498 10.618L21.37 10.658C21.7447 11.4362 21.9115 12.2982 21.854 13.16L21.827 13.447L21.102 19.248C21.045 19.7048 20.8321 20.128 20.4992 20.4461C20.1664 20.7642 19.734 20.9577 19.275 20.994L19.117 21H18C17.4954 21.0002 17.0094 20.8096 16.6395 20.4665C16.2695 20.1234 16.0428 19.6532 16.005 19.15L16 19H8C8.00016 19.5046 7.80959 19.9906 7.4665 20.3605C7.12341 20.7305 6.65316 20.9572 6.15 20.995L6 21H4.883C4.4225 21.0003 3.97601 20.8416 3.61892 20.5509C3.26183 20.2601 3.01602 19.855 2.923 19.404L2.898 19.248L2.173 13.448C2.06587 12.5901 2.18301 11.7191 2.513 10.92L2.63 10.657L2.606 10.652C2.45082 10.6133 2.31081 10.529 2.20404 10.4099C2.09727 10.2908 2.02863 10.1425 2.007 9.984L2 9.875V9.4C1.99998 9.30779 2.03182 9.2184 2.09014 9.14697C2.14845 9.07553 2.22965 9.02644 2.32 9.008L2.4 9H3.563L5.556 5.512C5.8015 5.08233 6.14947 4.72006 6.56891 4.45747C6.98836 4.19488 7.46625 4.04012 7.96 4.007L8.16 4H15.84ZM19.76 12.036C19.2431 12.6029 18.5257 12.9462 17.76 12.993L17.554 13H6.446C6.03145 13.0027 5.62096 12.9183 5.24111 12.7522C4.86127 12.5861 4.52054 12.3421 4.241 12.036C4.15844 12.3381 4.12369 12.6512 4.138 12.964L4.158 13.199L4.883 19H6V18C6.00003 17.7551 6.08996 17.5187 6.25272 17.3356C6.41547 17.1526 6.63975 17.0357 6.883 17.007L7 17H17C17.2449 17 17.4813 17.09 17.6644 17.2527C17.8474 17.4155 17.9643 17.6397 17.993 17.883L18 18V19H19.117L19.842 13.199C19.892 12.807 19.863 12.412 19.76 12.036ZM5.737 13.898L8.48 15.38C8.853 15.582 8.698 16.149 8.274 16.132L5.96 16.039C5.70195 16.0287 5.4579 15.9189 5.27896 15.7327C5.10001 15.5465 5.00005 15.2983 5 15.04V14.34C4.99995 14.2534 5.02241 14.1682 5.06518 14.0929C5.10794 14.0176 5.16955 13.9546 5.24395 13.9103C5.31836 13.8659 5.40301 13.8416 5.48962 13.8398C5.57623 13.838 5.66182 13.8588 5.738 13.9L5.737 13.898ZM18.999 14.338V15.039C18.9992 15.2974 18.8994 15.5459 18.7204 15.7323C18.5414 15.9188 18.2972 16.0287 18.039 16.039L15.725 16.131C15.301 16.148 15.145 15.581 15.519 15.379L18.261 13.899C18.3372 13.8578 18.4228 13.837 18.5094 13.8388C18.596 13.8406 18.6806 13.8649 18.755 13.9093C18.8295 13.9536 18.8911 14.0166 18.9338 14.0919C18.9766 14.1672 18.999 14.2514 18.999 14.338ZM15.84 6H8.16C7.98374 6.00006 7.81062 6.0467 7.65819 6.13521C7.50576 6.22372 7.37943 6.35095 7.292 6.504L5.578 9.504C5.49114 9.65606 5.44574 9.82826 5.44633 10.0034C5.44692 10.1785 5.49349 10.3504 5.58137 10.5019C5.66926 10.6533 5.79538 10.7791 5.94711 10.8665C6.09885 10.9539 6.27088 10.9999 6.446 11H17.554C17.7291 10.9999 17.9012 10.9539 18.0529 10.8665C18.2046 10.7791 18.3307 10.6533 18.4186 10.5019C18.5065 10.3504 18.5531 10.1785 18.5537 10.0034C18.5543 9.82826 18.5089 9.65606 18.422 9.504L16.708 6.504C16.6205 6.3508 16.494 6.22348 16.3414 6.13496C16.1888 6.04644 16.0154 5.99988 15.839 6H15.84Z"
                fill="currentColor"
              />
            </svg>

            <p>Cars</p>
          </li>
          <li
            onClick={() => {
              globalContext.setActiveMenu("settings");
              setNavIsOpen(false);
            }}
            className={
              globalContext.activeMenu === "settings" ? styles.active : ""
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${
                globalContext.activeMenu === "settings"
                  ? styles.active_icon
                  : ""
              }`}
            >
              <path
                d="M12.0005 16.5C14.4858 16.5 16.5005 14.4853 16.5005 12C16.5005 9.51472 14.4858 7.5 12.0005 7.5C9.51521 7.5 7.50049 9.51472 7.50049 12C7.50049 14.4853 9.51521 16.5 12.0005 16.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.5198 4.13952L9.75078 2.81315C9.65586 2.74175 9.54534 2.69393 9.42831 2.67363C9.31129 2.65332 9.19112 2.66112 9.0777 2.69638C8.52982 2.86794 7.99827 3.08787 7.48933 3.35355C7.38397 3.40881 7.29327 3.48834 7.22471 3.58556C7.15614 3.68278 7.11169 3.79492 7.095 3.91271L6.78228 6.10186C6.66307 6.20753 6.54637 6.31742 6.43217 6.43156C6.31801 6.54573 6.20809 6.66246 6.1024 6.78176L6.10235 6.78179L3.91359 7.09479C3.79599 7.11142 3.68402 7.15576 3.58691 7.22415C3.48981 7.29254 3.41034 7.38303 3.35507 7.48816C3.08898 7.99689 2.86863 8.52826 2.69662 9.076C2.6612 9.18957 2.6533 9.30994 2.67356 9.42717C2.69383 9.5444 2.74168 9.65513 2.81318 9.75022L4.14001 11.5193C4.13043 11.6783 4.12562 11.8385 4.12558 12C4.12558 12.1615 4.13039 12.3217 4.14002 12.4808L4.14001 12.4809L2.81364 14.2499C2.74224 14.3448 2.69442 14.4553 2.67411 14.5723C2.65381 14.6894 2.66161 14.8095 2.69686 14.923C2.86843 15.4708 3.08836 16.0024 3.35404 16.5113C3.4093 16.6167 3.48882 16.7074 3.58605 16.776C3.68327 16.8445 3.79541 16.889 3.9132 16.9057L6.10235 17.2184C6.20801 17.3376 6.31791 17.4543 6.43204 17.5685C6.54621 17.6827 6.66294 17.7926 6.78224 17.8983L6.78228 17.8983L7.09528 20.0871C7.1119 20.2047 7.15624 20.3167 7.22463 20.4138C7.29303 20.5109 7.38352 20.5903 7.48865 20.6456C7.99737 20.9117 8.52874 21.132 9.07648 21.304C9.19006 21.3395 9.31042 21.3474 9.42765 21.3271C9.54488 21.3068 9.65561 21.259 9.7507 21.1875L11.5198 19.8607C11.6788 19.8702 11.839 19.875 12.0005 19.8751C12.1619 19.8751 12.3222 19.8703 12.4813 19.8607L12.4814 19.8607L14.2504 21.187C14.3453 21.2584 14.4558 21.3063 14.5728 21.3266C14.6899 21.3469 14.81 21.3391 14.9235 21.3038C15.4713 21.1322 16.0029 20.9123 16.5118 20.6466C16.6172 20.5914 16.7079 20.5118 16.7764 20.4146C16.845 20.3174 16.8895 20.2053 16.9061 20.0875L17.2189 17.8983C17.3381 17.7927 17.4548 17.6828 17.569 17.5686C17.6831 17.4545 17.7931 17.3377 17.8988 17.2184L17.8988 17.2184L20.0876 16.9054C20.2052 16.8888 20.3171 16.8444 20.4142 16.776C20.5113 16.7076 20.5908 16.6172 20.6461 16.512C20.9122 16.0033 21.1325 15.4719 21.3045 14.9242C21.34 14.8106 21.3479 14.6902 21.3276 14.573C21.3073 14.4558 21.2595 14.3451 21.188 14.25L19.8611 12.4809C19.8707 12.3219 19.8755 12.1616 19.8756 12.0002C19.8756 11.8387 19.8708 11.6785 19.8611 11.5194L19.8611 11.5193L21.1875 9.75029C21.2589 9.65538 21.3067 9.54485 21.327 9.42783C21.3473 9.3108 21.3395 9.19063 21.3043 9.07721C21.1327 8.52933 20.9128 7.99778 20.6471 7.48884C20.5919 7.38349 20.5123 7.29279 20.4151 7.22422C20.3179 7.15566 20.2057 7.1112 20.088 7.09452L17.8988 6.78179C17.7931 6.66259 17.6832 6.54589 17.5691 6.43169C17.4549 6.31752 17.3382 6.2076 17.2189 6.10191L17.2189 6.10186L16.9059 3.9131C16.8892 3.7955 16.8449 3.68353 16.7765 3.58642C16.7081 3.48932 16.6176 3.40986 16.5125 3.35459C16.0038 3.08849 15.4724 2.86814 14.9247 2.69613C14.8111 2.66071 14.6907 2.65281 14.5735 2.67307C14.4563 2.69334 14.3455 2.7412 14.2504 2.81269L12.4814 4.13952C12.3224 4.12995 12.1621 4.12514 12.0007 4.12509C11.8392 4.12509 11.6789 4.1299 11.5199 4.13953L11.5198 4.13952Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Settings</p>
          </li>
          <li
            className={
              globalContext.activeMenu === "sign out" ? styles.active : ""
            }
            onClick={() => {
              globalContext.setActiveMenu("sign out");
              setNavIsOpen(false);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.icon} ${
                globalContext.activeMenu === "sign out"
                  ? styles.active_icon
                  : ""
              }`}
            >
              <path
                d="M16.3135 8.0625L20.2499 12L16.3135 15.9375"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.75 12H20.2472"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.75 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9.75"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p>Sign out</p>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
