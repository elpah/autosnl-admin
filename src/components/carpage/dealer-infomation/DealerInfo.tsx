import { InfoCard } from "./info-card/InfoCard";

import styles from "./dealer-info.module.css";
import {
  email_icon,
  location_icon,
  person_icon,
  phone_icon,
} from "../../../assets/images/images";

interface DealerInfoProps {
  dealer: {
    dealerId?: string;
    dealerName?: string;
    dealerAddress?: string;
    dealerPhone?: string;
    dealerEmail?: string;
  };
  children?: React.ReactNode;
}
export const DealerInfo = ({ dealer, children }: DealerInfoProps) => {
  const dealer_info = [
    { value: dealer?.dealerName, icon: `${person_icon}` },
    { value: dealer?.dealerAddress, icon: `${location_icon}` },
    { value: dealer?.dealerPhone, icon: `${phone_icon}` },
    { value: dealer?.dealerEmail, icon: `${email_icon}` },
  ];

  return (
    <>
      <div className={styles.dealer_info_container}>
        <div className={styles.dealer_info_header}>Dealer Details</div>
        <div className={styles.dealer_info_cards_container}>
          {dealer_info.map((info, index) => (
            <InfoCard
              key={index}
              value={info.value || "N/A"}
              icon={info.icon}
            />
          ))}
        </div>
      </div>
      {children}
    </>
  );
};
