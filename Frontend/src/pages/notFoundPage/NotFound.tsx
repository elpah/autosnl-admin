import { Link } from "react-router-dom";
import styles from "./notfound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/dashboard" className={styles.homeLink}>
        Back To Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
