const { prisma } = require("../prisma/prisma_client");

const createCalendar = async (req, res) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Месяцы в JavaScript начинаются с 0

  for (let month = currentMonth; month <= 12; month++) {
    const daysInMonth = new Date(currentYear, month, 0).getDate();
    const existingDates = await prisma.availability.findMany({
      where: {
        month: `${currentYear}-${month.toString().padStart(2, "0")}`,
      },
    });

    const existingDateSet = new Set(existingDates.map((date) => date.day));

    for (let day = 1; day <= daysInMonth; day++) {
      if (existingDateSet.has(day)) {
        continue; // Если дата уже существует в базе данных, пропускаем создание
      }

      for (let hour = 9; hour <= 18; hour++) {
        await prisma.availability.create({
          data: {
            month: `${currentYear}-${month.toString().padStart(2, "0")}`,
            day: day,
            hour: hour,
            isAvailable: true,
          },
        });
      }
    }

    console.log(
      `График доступности для мастера на месяц ${currentYear}-${month} создан успешно.`
    );
  }
  return res.status(200).json({ message: "расписание создано" });
};

const addAppointment = async (req, res) => {
  const { month, day, hour, telegramId, serviceId } = req.body;

  const client = await prisma.client.findFirst({
    where: {
      telegramId,
    },
  });
  const clientId = client.id;
  const clientName = client.name;

  const service = await prisma.services.findFirst({
    where: {
      id: parseInt(serviceId),
    },
  });
  const serviceName = service.name;
  const duration = service.duration;

  const apointment = await prisma.appointment.create({
    data: {
      month: month,
      day: parseInt(day),
      hour: parseInt(hour),
      duration: parseInt(duration),
      serviceId: parseInt(serviceId),
      clientId,
      clientName,
      serviceName,
    },
  });

  const findTimeSlot = await prisma.availability.findFirst({
    where: {
      month: month,
      day: parseInt(day),
      hour: parseInt(hour),
    },
  });

  if (findTimeSlot) {
    const hour = duration / 60;
    for (let i = 0; i < hour; i++) {
      await prisma.availability.update({
        where: {
          id: findTimeSlot.id + i,
        },
        data: {
          isAvailable: false,
        },
      });
    }
  }

  return res.status(201).json(apointment);
  // try {

  // } catch {
  //   return res.status(500).json("Не удалось сделать запись");
  // }
};

const getToday = async (req, res) => {
  try {
    const date = new Date().getDate();

    const todayList = await prisma.appointment.findMany({
      where: {
        day: date,
      },
    });

    return res.status(200).json(todayList);
  } catch {
    res.status(500).json("wrong");
  }
};

const getTomorrow = async (req, res) => {
  try {
    const date = new Date().getDate() + 1;

    const todayList = await prisma.appointment.findMany({
      where: {
        day: date,
      },
    });

    return res.status(200).json(todayList);
  } catch {
    res.status(500).json("wrong");
  }
};

module.exports = {
  addAppointment,
  createCalendar,
  getToday,
  getTomorrow,
};
