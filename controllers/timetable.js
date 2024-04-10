const { prisma } = require("../prisma/prisma_client");
const { startOfDay, addDays, endOfYear } = require("date-fns");
const { formatDate } = require("../utils/formatDate");

const generateSchedule = async (req, res) => {
  const { startHour, endHour, weekdays } = req.body;
  const userId = req.user.id;

  const start = parseInt(startHour);
  const end = parseInt(endHour);

  try {
    if (
      startHour === undefined ||
      endHour === undefined ||
      weekdays === undefined
    ) {
      throw new Error("Не заполнены обязательные поля");
    }

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Неверный формат времени");
    }

    if (start >= end) {
      throw new Error("Дата завершения должна быть позже даты начала");
    }

    const currentDate = new Date();
    const endDate = endOfYear(currentDate);

    // Генерация дат до конца года
    const dates = [];
    let currentDateCopy = startOfDay(currentDate);
    while (currentDateCopy <= endDate) {
      dates.push(formatDate(currentDateCopy));
      currentDateCopy = addDays(currentDateCopy, 1);
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
          availability.date.toISOString().split("T")[0] ===
          new Date(date).toISOString().split("T")[0]
      );

      // Если запись для текущей даты уже существует, пропускаем создание новой записи
      if (existingAvailability) {
        continue;
      }

      const hours = [];
      for (let hour = start; hour <= end; hour++) {
        // Проверяем, является ли текущий день недели в списке выбранных для установки isAvailable в false
        const weekday = new Date(date).getDay(); // 0 (воскресенье) - 6 (суббота)
        if (weekdays.includes(weekday.toString())) {
          hours.push({ hour, isAvailable: true, userId });
        } else {
          hours.push({ hour, isAvailable: false, userId });
        }
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
    await prisma.$transaction([
      prisma.hour.deleteMany({
        where: { userId },
      }),
      prisma.hourAvailability.deleteMany({
        where: { userId },
      }),
    ]);

    return res.status(200).json("ok");
  } catch (error) {
    console.error("Error deleting schedule:", error);
    return res.status(500).json({ message: "Ошибка при удалении расписания" });
  }
};

const getSchedule = async (req, res) => {
  try {
    const userId = req.user.id;

    const schedule = await prisma.hourAvailability.findMany({
      where: {
        userId,
      },
      include: { hours: true },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCurrentSchedule = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    const schedule = await prisma.hourAvailability.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: { hours: true },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    if (schedule.length === 0) {
      return res.status(404).json({ error: "Мастер не создал расписание" });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const changeHour = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;

  // Проверяем, был ли предоставлен id
  if (!id) {
    return res.status(400).json({ message: "Укажите время" });
  }

  // Проверяем, что id является числом
  if (isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Неверный формат времени" });
  }

  // Получаем текущий час
  const currentHour = await prisma.hour.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  // Проверяем, найден ли час с заданным id
  if (!currentHour) {
    return res.status(404).json({ message: "Час не найден" });
  }

  try {
    // Инвертируем значение isAvailable
    await prisma.hour.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isAvailable: !currentHour.isAvailable, // Инвертирование значения
      },
    });

    const schedule = await prisma.hourAvailability.findMany({
      where: {
        userId,
      },
      include: { hours: true },
    });

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Error updating hour:", error);
    return res.status(500).json({ message: "Ошибка при обновлении часа" });
  }
};

const changeDay = async (req, res) => {
  const { dayDate, isAvailable } = req.body; // Добавлено получение isAvailable из тела запроса
  const userId = req.user.id;

  try {
    if (!dayDate) {
      return res.status(400).json({ message: "Укажите дату дня" });
    }

    const isoDate = formatDate(dayDate);
    console.log(isoDate);

    // Находим день по его дате с часами
    const day = await prisma.hourAvailability.findUnique({
      where: {
        date: isoDate,
      },
      include: { hours: true },
    });

    if (!day) {
      return res.status(404).json({ message: "День не найден" });
    }

    // Собираем массив обновлений для всех часов в дне
    const updates = day.hours.map((hour) => {
      return prisma.hour.update({
        where: {
          id: hour.id,
        },
        data: {
          isAvailable: Boolean(isAvailable), // Используем значение из запроса
        },
      });
    });

    // Выполняем все обновления в рамках одной транзакции
    await prisma.$transaction(updates);

    const schedule = await prisma.hourAvailability.findMany({
      where: {
        userId,
      },
      include: { hours: true },
    });

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Error changing day:", error);
    return res
      .status(500)
      .json({ message: "Ошибка при изменении часов для дня" });
  }
};

module.exports = {
  generateSchedule,
  deleteSchedule,
  getSchedule,
  getCurrentSchedule,
  changeHour,
  changeDay,
};
