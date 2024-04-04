const { prisma } = require("../prisma/prisma_client");

const generateSchedule = async (req, res) => {
  const { startHour, endHour } = req.body;
  const userId = req.user.id;

  const start = parseInt(startHour);
  const end = parseInt(endHour);

  try {
    if (startHour === undefined || endHour === undefined) {
      throw new Error("Не заполнены обязательные поля");
    }

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Неверный формат времени");
    }

    if (start >= end) {
      throw new Error("Дата завершения должна быть позже даты начала");
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const endDate = new Date(currentYear + 1, 0, 1); // Дата, завершающая год

    // Генерация дат до конца года
    const dates = [];
    const currentDateCopy = new Date(currentDate);
    while (currentDateCopy < endDate) {
      dates.push(new Date(currentDateCopy));
      currentDateCopy.setDate(currentDateCopy.getDate() + 1);
    }

    if (dates.length === 0) {
      throw new Error("Не удалось сгенерировать даты для расписания");
    }

    // Получение всех записей о доступности часов для данного пользователя
    const existingAvailabilities = await prisma.hourAvailability.findMany({
      where: {
        userId: userId,
      },
    });

    // Создание записей о доступности часов для каждой даты, если они еще не существуют
    for (const date of dates) {
      const existingAvailability = existingAvailabilities.find(
        (availability) =>
          availability.date.toDateString() === date.toDateString()
      );

      // Если запись для текущей даты уже существует, пропускаем создание новой записи
      if (existingAvailability) {
        continue;
      }

      const hours = [];
      for (let hour = start; hour <= end; hour++) {
        hours.push({ hour, isAvailable: true, userId });
      }

      await prisma.hourAvailability.create({
        data: {
          date,
          userId,
          hours: {
            createMany: {
              data: hours,
            },
          },
        },
      });
    }

    console.log(
      `Schedule generated from ${startHour}:00 to ${endHour}:00 for the rest of the year.`
    );

    return res.status(201).json({ message: "Календарь успешно создан" });
  } catch (error) {
    console.error("Error generating schedule:", error);
    return res
      .status(500)
      .json({ message: error.message || "Ошибка при генерации расписания" });
  }
};

const deleteSchedule = async (req, res) => {
  const userId = req.user.id;

  try {
    await prisma.hour.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    await prisma.hourAvailability.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json("ok");
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return res.status(500).json({ message: "Ошибка при удалении расписания" });
  }
};

const getSchedule = async (req, res) => {
  const userId = req.user.id;

  const schedule = await prisma.hourAvailability.findMany({
    where: {
      userId,
    },
    include: { hours: true },
  });

  return res.status(200).json(schedule);
};

const getDaySchedule = async (req, res) => {
  const { date } = req.body;
  const userId = req.user.id;

  // Преобразование строки даты в объект Date
  const parsedDate = new Date(date);

  // Проверка, является ли parsedDate действительным объектом Date
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: "Неверный формат даты" });
  }

  // Использование parsedDate в запросе к Prisma
  const schedule = await prisma.hourAvailability.findMany({
    where: {
      date: parsedDate,
      userId,
      hours: {
        userId,
      },
    },
  });

  return res.status(200).json(schedule);
};

module.exports = {
  generateSchedule,
  deleteSchedule,
  getSchedule,
  getDaySchedule,
};
