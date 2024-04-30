export const timeToMinutes = (time) => {
  if (time) {
    let arrayFromSet = Array.from(time);
    const [hours, minutes] = arrayFromSet[0].split(":").map(Number);
    return hours * 60 + minutes;
  } else {
    return "";
  }
};
