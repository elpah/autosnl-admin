import styles from "./add-car-form.module.css";

type FromProps = {
  children?: React.ReactNode;
};
const AddCarForm = ({ children }: FromProps) => {
  return (
    <div className={styles.form_container}>
      <form>{children}</form>
    </div>
  );
};

export default AddCarForm;
