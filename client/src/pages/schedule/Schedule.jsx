import Calendar from "../../components/calendar/Calendar";
import { Header } from "../../components/header/Header";
import { Wrapper } from "../../components/wrapper/Wrapper";

const data = [
  {
    id: 1,
    month: "2024-04",
    day: 1,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 2,
    month: "2024-04",
    day: 1,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 3,
    month: "2024-04",
    day: 1,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 4,
    month: "2024-04",
    day: 1,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 5,
    month: "2024-04",
    day: 1,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 6,
    month: "2024-04",
    day: 1,
    hour: 14,
    isAvailable: true,
  },
  {
    id: 7,
    month: "2024-04",
    day: 1,
    hour: 15,
    isAvailable: true,
  },
  {
    id: 8,
    month: "2024-04",
    day: 1,
    hour: 16,
    isAvailable: true,
  },
  {
    id: 9,
    month: "2024-04",
    day: 1,
    hour: 17,
    isAvailable: true,
  },
  {
    id: 10,
    month: "2024-04",
    day: 1,
    hour: 18,
    isAvailable: true,
  },
  {
    id: 11,
    month: "2024-04",
    day: 2,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 12,
    month: "2024-04",
    day: 2,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 13,
    month: "2024-04",
    day: 2,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 14,
    month: "2024-04",
    day: 2,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 15,
    month: "2024-04",
    day: 2,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 16,
    month: "2024-04",
    day: 2,
    hour: 14,
    isAvailable: true,
  },
  {
    id: 17,
    month: "2024-04",
    day: 2,
    hour: 15,
    isAvailable: true,
  },
  {
    id: 18,
    month: "2024-04",
    day: 2,
    hour: 16,
    isAvailable: true,
  },
  {
    id: 19,
    month: "2024-04",
    day: 2,
    hour: 17,
    isAvailable: true,
  },
  {
    id: 20,
    month: "2024-04",
    day: 2,
    hour: 18,
    isAvailable: true,
  },
  {
    id: 21,
    month: "2024-04",
    day: 3,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 22,
    month: "2024-04",
    day: 3,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 23,
    month: "2024-04",
    day: 3,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 24,
    month: "2024-04",
    day: 3,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 25,
    month: "2024-04",
    day: 3,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 26,
    month: "2024-04",
    day: 3,
    hour: 14,
    isAvailable: true,
  },
  {
    id: 27,
    month: "2024-04",
    day: 3,
    hour: 15,
    isAvailable: true,
  },
  {
    id: 28,
    month: "2024-04",
    day: 3,
    hour: 16,
    isAvailable: true,
  },
  {
    id: 29,
    month: "2024-04",
    day: 3,
    hour: 17,
    isAvailable: true,
  },
  {
    id: 30,
    month: "2024-04",
    day: 3,
    hour: 18,
    isAvailable: true,
  },
  {
    id: 31,
    month: "2024-04",
    day: 4,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 32,
    month: "2024-04",
    day: 4,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 33,
    month: "2024-04",
    day: 4,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 34,
    month: "2024-04",
    day: 4,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 35,
    month: "2024-04",
    day: 4,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 36,
    month: "2024-04",
    day: 4,
    hour: 14,
    isAvailable: true,
  },
  {
    id: 37,
    month: "2024-04",
    day: 4,
    hour: 15,
    isAvailable: true,
  },
  {
    id: 38,
    month: "2024-04",
    day: 4,
    hour: 16,
    isAvailable: true,
  },
  {
    id: 39,
    month: "2024-04",
    day: 4,
    hour: 17,
    isAvailable: true,
  },
  {
    id: 40,
    month: "2024-04",
    day: 4,
    hour: 18,
    isAvailable: true,
  },
  {
    id: 41,
    month: "2024-04",
    day: 5,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 42,
    month: "2024-04",
    day: 5,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 43,
    month: "2024-04",
    day: 5,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 44,
    month: "2024-04",
    day: 5,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 45,
    month: "2024-04",
    day: 5,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 46,
    month: "2024-04",
    day: 5,
    hour: 14,
    isAvailable: true,
  },
  {
    id: 47,
    month: "2024-04",
    day: 5,
    hour: 15,
    isAvailable: true,
  },
  {
    id: 48,
    month: "2024-04",
    day: 5,
    hour: 16,
    isAvailable: true,
  },
  {
    id: 49,
    month: "2024-04",
    day: 5,
    hour: 17,
    isAvailable: true,
  },
  {
    id: 50,
    month: "2024-04",
    day: 5,
    hour: 18,
    isAvailable: true,
  },
  {
    id: 51,
    month: "2024-04",
    day: 6,
    hour: 9,
    isAvailable: false,
  },
  {
    id: 52,
    month: "2024-04",
    day: 6,
    hour: 10,
    isAvailable: false,
  },
  {
    id: 53,
    month: "2024-04",
    day: 6,
    hour: 11,
    isAvailable: false,
  },
  {
    id: 54,
    month: "2024-04",
    day: 6,
    hour: 12,
    isAvailable: false,
  },
  {
    id: 55,
    month: "2024-04",
    day: 6,
    hour: 13,
    isAvailable: false,
  },
  {
    id: 56,
    month: "2024-04",
    day: 6,
    hour: 14,
    isAvailable: false,
  },
  {
    id: 57,
    month: "2024-04",
    day: 6,
    hour: 15,
    isAvailable: false,
  },
  {
    id: 58,
    month: "2024-04",
    day: 6,
    hour: 16,
    isAvailable: false,
  },
  {
    id: 59,
    month: "2024-04",
    day: 6,
    hour: 17,
    isAvailable: false,
  },
  {
    id: 60,
    month: "2024-04",
    day: 6,
    hour: 18,
    isAvailable: false,
  },
  {
    id: 61,
    month: "2024-04",
    day: 7,
    hour: 9,
    isAvailable: true,
  },
  {
    id: 62,
    month: "2024-04",
    day: 7,
    hour: 10,
    isAvailable: true,
  },
  {
    id: 63,
    month: "2024-04",
    day: 7,
    hour: 11,
    isAvailable: true,
  },
  {
    id: 64,
    month: "2024-04",
    day: 7,
    hour: 12,
    isAvailable: true,
  },
  {
    id: 65,
    month: "2024-04",
    day: 7,
    hour: 13,
    isAvailable: true,
  },
  {
    id: 66,
    month: "2024-04",
    day: 7,
    hour: 14,
    isAvailable: true,
  },
];

function formatCalendarData(data) {
  const calendarData = {};

  // Проходимся по каждому элементу массива
  data.forEach((item) => {
    const { month, day, hour, isAvailable } = item;
    const dateKey = `${month}-${day}`;

    // Если такой ключ уже существует, добавляем текущий объект в массив
    if (calendarData[dateKey]) {
      calendarData[dateKey].push({ hour, isAvailable });
    } else {
      // Если ключа нет, создаем новый массив с текущим объектом
      calendarData[dateKey] = [{ hour, isAvailable }];
    }
  });

  return calendarData;
}

console.log(formatCalendarData(data));

const formattedData = formatCalendarData(data);
console.log(formattedData);

export const Schedule = () => {
  return (
    <Wrapper wrapperClass={"wrapperForMobile"}>
      <Header firstLetter="Г" />
      <Calendar />
    </Wrapper>
  );
};
