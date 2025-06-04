import styles from "./add-dealer-form.module.css";

const AddDealerForm = () => {
  return (
    <div className={`${styles.form_field} ${styles.dealer}`}>
      <label htmlFor="">Dealer</label>
      <select name="dealer" id="dealer">
        <option value="other">Other</option>
        <option value="dealer1">dealer1</option>
        <option value="dealer2">dealer2</option>
      </select>
      <input type="text" placeholder="Dealer Name" />
      <input type="text" placeholder="Dealer Email" />
      <input type="text" placeholder="Dealer Phone Number" />
      <input type="text" placeholder="Dealer Address" />
    </div>
  );
};

export default AddDealerForm;
