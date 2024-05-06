export const convertTimeToString = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours} ч${minutes === 0 ? "" : ` ${minutes} мин`}`;
};
