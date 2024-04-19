import { createFormDateForSetting } from "../../utils/createFormDateForSetting";
import { createSettings } from "../../modules/api_requests";
import { useSteps } from "../../hooks/useSteps";
import { useEffect, useState } from "react";
import { Step_1 } from "./Step_1";
import { Step_2 } from "./Step_2";
import { Step_3 } from "./Step_3";
import { Step_4 } from "./Step_4";
import { Step_5 } from "./Step_5";
import styles from "./StepComponent.module.css";

export const StepComponent = ({ botSetting, setIsCreated, setBotSetting }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const {
    step,
    nextStep,
    prevStep,
    error,
    setErrorState,
    localError,
    setLocalErrorState,
  } = useSteps(0);

  useEffect(() => {
    if (step === 0) {
      !isCheckboxChecked ? setErrorState(true) : setErrorState(false);
    }
    if (step === 1) {
      !botSetting.botToken ? setErrorState(true) : setErrorState(false);
    }
    if (step === 2) {
      !botSetting.address ? setErrorState(true) : setErrorState(false);
    }
    if (step === 3) {
      !botSetting.greetingText ? setErrorState(true) : setErrorState(false);
    }
    if (step === 4) {
      !botSetting.notificationText ? setErrorState(true) : setErrorState(false);
    }
  }, [isCheckboxChecked, step, botSetting, setErrorState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleBackClick = () => {
    prevStep();
  };

  const handleContinueClick = () => {
    if (step === 1) {
      fetch(`https://api.telegram.org/bot${botSetting.botToken}/getMe`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ok) {
            setLocalErrorState(false);
            setErrorState(false);
            nextStep();
          } else {
            setLocalErrorState(true);
            console.log(localError);
            setErrorState(true);
          }
        })
        .catch((error) => {
          console.error("Ошибка:", error);
        });
    } else if (step < 4) {
      nextStep();
    } else {
      createSettings(createFormDateForSetting(botSetting)).then((data) => {
        console.log(data);
      });
      setIsCreated(true);
    }
  };

  const steps = [
    <Step_1
      key={"step_1"}
      isCheckboxChecked={isCheckboxChecked}
      handleCheckboxChange={handleCheckboxChange}
    />,
    <Step_2
      key={"step_2"}
      localError={localError}
      setBotSetting={setBotSetting}
      botSetting={botSetting}
      setLocalErrorState={setErrorState}
    />,
    <Step_3
      key={"step_3"}
      localError={localError}
      botSetting={botSetting}
      setBotSetting={setBotSetting}
      setLocalErrorState={setLocalErrorState}
    />,
    <Step_4
      key={"step_4"}
      localError={localError}
      botSetting={botSetting}
      setBotSetting={setBotSetting}
      setLocalErrorState={setLocalErrorState}
    />,
    <Step_5
      key={"step_5"}
      localError={localError}
      botSetting={botSetting}
      setBotSetting={setBotSetting}
      setLocalErrorState={setLocalErrorState}
    />,
  ];

  return (
    <div className={styles.settingsBox}>
      {steps[step]}

      <div className={styles.buttonsRow}>
        {/* Back Button */}
        {step !== 0 && (
          <button
            onClick={handleBackClick}
            className={`${styles.button} ${styles.buttonBack}`}
            disabled={!isCheckboxChecked || step === 0}
          >
            <span>Назад</span>
          </button>
        )}

        {/* Continue Button */}
        {step === 0 && <div></div>}
        <button
          onClick={handleContinueClick}
          className={`${styles.button} ${styles.buttonNext}`}
          disabled={error}
        >
          <span>{step === 4 ? "Сохранить" : "Далее"}</span>
        </button>
      </div>
    </div>
  );
};
