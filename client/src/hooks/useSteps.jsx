// В useSteps.js

import { useState } from "react";

export function useSteps(initialStep) {
  const [step, setStep] = useState(initialStep);
  const [error, setError] = useState(false);
  const [localError, setLocalError] = useState(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const setErrorState = (state) => setError(state);
  const setLocalErrorState = (state) => setLocalError(state);

  return {
    step,
    nextStep,
    prevStep,
    error,
    setErrorState,
    localError,
    setLocalErrorState,
  };
}
