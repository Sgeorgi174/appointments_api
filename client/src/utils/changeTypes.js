export const changeType = ({
  date,
  event,
  className,
  setTypeToChanges,
  setIsAvailable,
  type,
}) => {
  const today = new Date();

  if (date < today) {
    setTypeToChanges("past");
    return;
  }

  if (event.target.className.includes(className)) {
    setIsAvailable(false);
  } else {
    setIsAvailable(true);
  }

  setTypeToChanges(type);
};
