import useDealers from "../../hooks/useDealers";
import { useContext, useEffect } from "react";
import {
  GlobalContext,
  IDealer,
  type ICarData,
} from "../../context/GlobalContext";

import styles from "./add-dealer-form.module.css";
const AddDealerForm = () => {
  const globalContext = useContext(GlobalContext);
  const { data: dealerData, isLoading: dealerIsLoading, error } = useDealers();

  useEffect(
    () => console.table(globalContext.carData),
    [globalContext.carData]
  );

  const updateDealerField = (field: keyof IDealer, value: string) => {
    if (field === "dealerId") {
      globalContext.setCarData((prev) => ({
        ...prev,
        dealer: {
          dealerId: value === "other" ? "" : value,
          isOther: value === "other",
        },
      }));
      return;
    }
    // else if (field === "dealerId" && value !== "other") {
    //   globalContext.setCarData((prev) => ({
    //     ...prev,
    //     dealer: {
    //       isOther: false,
    //     },
    //   }));
    //   return;
    // }

    globalContext.setCarData((prev) => ({
      ...prev,
      dealer: {
        ...(typeof prev.dealer === "object" && prev.dealer !== null
          ? prev.dealer
          : {}),
        [field]: value,
      },
    }));
  };

  if (dealerIsLoading) return <div>is loading...</div>;

  return (
    <div className={`${styles.form_field} ${styles.dealer}`}>
      <label htmlFor="">Dealer</label>
      <select
        name="dealer"
        id="dealer"
        value={
          typeof globalContext.carData.dealer === "object" &&
          globalContext.carData.dealer !== null
            ? globalContext.carData.dealer.dealerId
            : ""
        }
        onChange={(e) => updateDealerField("dealerId", e.target.value)}
      >
        <option value="other">Other</option>
        {dealerData?.map((dealer, index) => (
          <option key={index} value={dealer.dealerId}>
            {dealer.dealerId}, {dealer.dealerName}, {dealer.dealerEmail}
          </option>
        ))}
      </select>
      {typeof globalContext.carData.dealer === "object" &&
        globalContext.carData.dealer?.isOther && (
          <div>
            <input
              value={
                typeof globalContext.carData.dealer === "object" &&
                globalContext.carData.dealer !== null
                  ? globalContext.carData.dealer.dealerName
                  : ""
              }
              onChange={(e) => updateDealerField("dealerName", e.target.value)}
              type="text"
              placeholder="Dealer Name"
            />
            <input
              value={
                typeof globalContext.carData.dealer === "object" &&
                globalContext.carData.dealer !== null
                  ? globalContext.carData.dealer.dealerEmail
                  : ""
              }
              onChange={(e) => updateDealerField("dealerEmail", e.target.value)}
              type="text"
              placeholder="Dealer Email"
            />
            <input
              value={
                typeof globalContext.carData.dealer === "object" &&
                globalContext.carData.dealer !== null
                  ? globalContext.carData.dealer.dealerPhone
                  : ""
              }
              onChange={(e) => updateDealerField("dealerPhone", e.target.value)}
              type="text"
              placeholder="Dealer Phone Number"
            />
            <input
              value={
                typeof globalContext.carData.dealer === "object" &&
                globalContext.carData.dealer !== null
                  ? globalContext.carData.dealer.dealerAddress
                  : ""
              }
              onChange={(e) =>
                updateDealerField("dealerAddress", e.target.value)
              }
              type="text"
              placeholder="Dealer Address"
            />
          </div>
        )}
    </div>
  );
};

export default AddDealerForm;
