import { formatDateYYYYMMDD } from "./slicers.js";

export const sortAppointments = (appointmentsArray) => {
  return appointmentsArray.sort((a, b) => {
    const dateComparison = new Date(a.day) - new Date(b.day);
    return dateComparison === 0 ? a.hour - b.hour : dateComparison;
  });
};

const filterByDate = (appointmentsArray, date) => {
  const formattedDate = formatDateYYYYMMDD(date);
  return appointmentsArray.filter(
    (appointment) => appointment.day === formattedDate
  );
};

export const filterByOption = (activeTab, appointmentsArray) => {
  let filteredArr = [];
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  switch (activeTab) {
    case 0:
      filteredArr = filterByDate(appointmentsArray, today);
      break;
    case 1:
      filteredArr = filterByDate(appointmentsArray, tomorrow);
      break;
    case 2:
      filteredArr = appointmentsArray;
      break;
    case 3:
      filteredArr = appointmentsArray.filter(
        (appointment) => appointment.status === "pending"
      );
      break;
    default:
      filteredArr = appointmentsArray;
  }

  return sortAppointments(filteredArr);
};
