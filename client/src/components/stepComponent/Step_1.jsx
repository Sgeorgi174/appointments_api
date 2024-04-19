import { InstructionToCreateBot } from "../InstructionToCreateBot/InstructionToCreateBot";
import styles from "./StepComponent.module.css";

export const Step_1 = ({ isCheckboxChecked, handleCheckboxChange }) => {
  return (
    <div className={`${styles.settingBox} ${styles.slideInRight}`}>
      <InstructionToCreateBot
        isCheckboxChecked={isCheckboxChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};
