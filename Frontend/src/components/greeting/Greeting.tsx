import { useContext } from "react";
import styles from "./greeting.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import { getGreeting } from "../../utils/utilFunctions";

const Greeting = () => {

  const globalContext = useContext(GlobalContext);
  return (
    <div className={styles.goodmorning_container}>
      <p>{getGreeting()}</p>
      <h2>{globalContext.loggedUser.firstname}</h2>
    </div>
  );
};

export default Greeting;
