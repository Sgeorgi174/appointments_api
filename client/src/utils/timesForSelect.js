export const timesForSelect = () => {
  let times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      let hour = i < 10 ? `0${i}` : `${i}`;
      let minute = j === 0 ? "00" : `${j}`;
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};
