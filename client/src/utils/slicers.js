import { format } from "date-fns";

export const sliceDate = (date) => {
  const dateString = date;

  const dateObject = new Date(Date.parse(dateString));
  const timezoneOffsetInMinutes = -dateObject.getTimezoneOffset();
  dateObject.setMinutes(dateObject.getMinutes() + timezoneOffsetInMinutes);
  const isoString = dateObject.toISOString().slice(0, 10);

  return isoString;
};

export const formattedDateForHeader = (date) => {
  const month = date.toLocaleString("ru", { month: "long" });
  const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.toLocaleString("ru", { year: "numeric" });

  return `${formattedMonth} ${year}`;
};

export function formatDateYYYYMMDD(date) {
  const formatDate = format(date, "yyyy-MM-dd", { formatStr: "string" });
  return String(formatDate);
}

export const currentTime = () => {
  const now = new Date();
  return format(now, "HH:mm");
};
