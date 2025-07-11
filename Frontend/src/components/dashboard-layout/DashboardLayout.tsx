import { ReactNode } from "react";
import Nav from "../nav/Nav";
import SideNav from "../sideNav/SideNav";
import Greeting from "../greeting/Greeting";

import styles from "./dashboard-layout.module.css";

interface IDashboardProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: IDashboardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <SideNav />
        <div className={styles.nav_and_body}>
          <Nav />
          <div className={styles.body_container}>
            <Greeting />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
