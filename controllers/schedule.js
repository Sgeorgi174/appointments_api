const { prisma } = require("../prisma/prisma_client");
const { getScheduleByUserId } = require("../utils/getScheduleByUserId");

const addDays = async (req, res) => {
  const userId = req.user.id;
  const days = req.body;

  // Проверка, является ли `days` массивом
  if (!Array.isArray(days)) {
    return res
      .status(400)
      .json({ error: "Данные должны быть в формате массива" });
  }

  // Проверка каждого объекта в массиве `days`
  for (const day of days) {
    if (typeof day !== "object" || day === null) {
      return res
        .status(400)
        .json({ error: "Каждый элемент в массиве должен быть объектом" });
    }
  }

  try {
    await Promise.all(
      days.map((day) => {
        return prisma.date.upsert({
          where: {
            date_userId: {
              date: day.date,
              userId: userId,
            },
          },
          update: {
            ...day,
            userId: userId,
          },
          create: {
            ...day,
            userId: userId,
          },
        });
      })
    );

    const schedule = await getScheduleByUserId(userId);

    res.status(200).json(schedule);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ошибка при добавлении или обновлении дней" });
  }
};

const deleteDays = async (req, res) => {
  const userId = req.user.id;
  const days = req.body;

  // Проверка, является ли `days` массивом
  if (!Array.isArray(days)) {
    return res
      .status(400)
      .json({ error: "Данные должны быть в формате массива" });
  }

  try {
    await Promise.all(
      days.map((day) => {
        return prisma.date.deleteMany({
          where: {
            date: day,
            userId: userId,
          },
        });
      })
    );

    const schedule = await getScheduleByUserId(userId);

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении дней" });
  }
};

const getAllDays = async (req, res) => {
  const userId = req.user.id;

  try {
    const schedule = await getScheduleByUserId(userId);

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении дней" });
  }
};

const getAvailableSlots = async (req, res) => {
  const { userId } = req.body;

  try {
    const dates = await prisma.date.findMany({
      where: {
        userId: userId,
      },
    });

    const times = await Promise.all(
      dates.map(async (date) => {
        const appointments = await prisma.appointment.findMany({
          where: {
            userId: userId,
            day: date.date,
          },
        });

        const occupiedTimes = appointments.map(
          (appointment) => appointment.startTime
        );

        let availableTimes = [];
        for (let i = date.startTime; i < date.endTime; i += 30) {
          if (
            !occupiedTimes.includes(i) &&
            (i < date.startRest || i >= date.endRest)
          ) {
            availableTimes.push(i);
          }
        }

        return availableTimes;
      })
    );

    res.status(200).json({ dates, times });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении доступных слотов" });
  }
};

module.exports = { addDays, deleteDays, getAllDays, getAvailableSlots };
