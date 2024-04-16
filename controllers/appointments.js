const { prisma } = require("../prisma/prisma_client");

//there are 3 type of status : 'pending' || 'confirmed' || 'passed'

const addAppointment = async (req, res) => {
  try {
    const { serviceId, clientId, date, time, query_id, userId } = req.body;

    // Проверка обязательных полей
    if (
      ![serviceId, clientId, date, time, query_id, userId].every(
        (param) => param !== undefined
      )
    ) {
      throw new Error("Не заполнены обязательные поля");
    }

    // Получение продолжительности услуги
    const service = await prisma.services.findUnique({
      where: { id: parseInt(serviceId) },
    });

    if (!service) {
      throw new Error("Услуга не найдена");
    }

    const { duration } = service;

    // Поиск доступности на указанную дату и время
    const availability = await prisma.hourAvailability.findFirst({
      where: { date, userId: parseInt(userId) },
      include: { hours: true },
    });

    if (!availability) {
      throw new Error("Нет доступности на указанную дату");
    }

    for (let i = 0; i < duration; i++) {
      const currentHour = availability.hours.find((h) => {
        return h.hour === parseInt(time) + i;
      });

      console.log(currentHour);

      if (currentHour || currentHour.isAvailable) {
        await prisma.hour.update({
          where: { id: currentHour.id },
          data: { isAvailable: false },
        });
      } else {
        throw new Error("Время уже занято");
      }
    }

    //Создание новой записи
    const appointment = await prisma.appointment.create({
      data: {
        day: date,
        hour: parseInt(time),
        clientId: parseInt(clientId),
        serviceId: parseInt(serviceId),
        userId: parseInt(userId),
        status: "pending",
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error("Error adding appointment:", error);
    return res
      .status(500)
      .json({ message: error.message || "Ошибка при добавлении записи" });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    // Проверка обязательных полей
    if (!id) {
      throw new Error("Не заполнены обязательные поля");
    }

    if (!userId) {
      throw new Error("Не авторизован");
    }

    // Получение информации о записи
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: { service: true },
    });

    if (!appointment) {
      throw new Error("Запись не найдена");
    }

    const { day, hour, service } = appointment;
    const { duration } = service;

    // Поиск доступности на указанную дату
    const availability = await prisma.hourAvailability.findFirst({
      where: { date: day, userId: appointment.userId },
      include: { hours: true },
    });

    if (!availability) {
      throw new Error("Нет доступности на указанную дату");
    }

    for (let i = 0; i < duration; i++) {
      const currentHour = availability.hours.find((h) => {
        return h.hour === hour + i;
      });

      if (currentHour) {
        await prisma.hour.update({
          where: { id: currentHour.id },
          data: { isAvailable: true },
        });
      }
    }

    // Удаление записи
    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Запись успешно удалена" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res
      .status(500)
      .json({ message: error.message || "Ошибка при удалении записи" });
  }
};

const confirmAppointment = async (req, res) => {
  const { id } = req.body;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      include: { client: true, service: true },
      data: { status: "confirmed" },
    });

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while confirming the appointment" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await prisma.appointment.findMany({
      where: { userId: userId, status: { not: "passed" } },
      include: { client: true, service: true },
    });

    if (!appointments) {
      throw new Error("У вас нет записей");
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error getting appointment:", error);
    return res
      .status(500)
      .json({ message: error.message || "Ошибка при получении записей" });
  }
};

module.exports = {
  addAppointment,
  deleteAppointment,
  getAllAppointments,
  confirmAppointment,
};
