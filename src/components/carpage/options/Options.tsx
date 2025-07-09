import { OptionItem } from "./option-items/OptionItem";
import styles from "./options.module.css";

type CarOptions = {
  [key: string]: string[];
};

type OptionsProps = {
  carOptions: CarOptions;
};

export const Options: React.FC<OptionsProps> = ({ carOptions }) => {
  return (
    <div className={styles.options_container}>
      <div className={styles.options_header}>Options</div>
      {Object.entries(carOptions).map(([key, items]) => (
        <OptionItem key={key} title={formatTitle(key)} items={items || []} />
      ))}
    </div>
  );
};

const formatTitle = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};
