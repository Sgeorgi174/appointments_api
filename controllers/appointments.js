const { prisma } = require("../prisma/prisma_client");
const TelegramBot = require("node-telegram-bot-api");
const { getServiceById } = require("../utils/getServiceById");
const { getClientById } = require("../utils/getClientById");
const { getBotSettingByUserId } = require("../utils/getBotSettingByUserId");
const { getAppointmentById } = require("../utils/getAppointmentById");
const { sendNotification } = require("../utils/sendNotifation");

//there are 3 type of status : 'pending' || 'confirmed' || 'passed'

const addAppointment = async (req, res) => {
  try {
    const { serviceId, clientId, date, time, userId } = req.body;

    // Проверка обязательных полей
    if (
      ![serviceId, clientId, date, time, userId].every(
        (param) => param !== undefined
      )
    ) {
      throw new Error("Не заполнены обязательные поля");
    }

    // Получение продолжительности услуги
    const service = await getServiceById(serviceId);
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

    if (appointment) {
      const client = await getClientById(clientId);
      const botSetting = await getBotSettingByUserId(userId);
      const botToken = botSetting.botToken;

      if (botToken) {
        const bot = new TelegramBot(botToken, { polling: false });

        if (client.telegramId) {
          await bot.sendMessage(
            client.telegramId,
            `Привет, ${client.name}! 👋
Ваша заявка принята и ожидает подтверждения мастера. 
Не переживайте, это не займет много времени.`
          );
        }

        await bot.sendMessage(
          botSetting.telegramId,
          `⚠️ *У вас новая запись!* ⚠️
          
📆 *${appointment.day.split("-")[2]}.${appointment.day.split("-")[1]} - ${
            appointment.hour
          }:00*
🧑 ${client.name}
☎️ ${client.telNumber}
💼 ${service.name}

*Подтвердите или отмените в личном кабинете*
`,
          {
            parse_mode: "Markdown",
          }
        );
        bot.sendSticker(
          botSetting.telegramId,
          "CAACAgIAAxkBAAEEzVBmILAmhnUU7iJV4Qj-_efzQVA-qwACAQEAAvcCyA--Bt0rrVjiJDQE"
        );
      }
    }

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
    const { id } = req.body;

    // Проверка обязательных полей
    if (!id) {
      throw new Error("Не заполнены обязательные поля");
    }

    // Получение информации о записи
    const appointment = await getAppointmentById({ id });
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
      where: { id: parseInt(appointment.id) },
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

  if (!id) {
    throw new Error("Не заполнены обязательные поля");
  }

  try {
    const appointment = await getAppointmentById({ id });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(appointment.id) },
      include: { client: true, service: true },
      data: { status: "confirmed" },
    });

    if (updatedAppointment.client.telegramId) {
      const botSetting = await getBotSettingByUserId(updatedAppointment.userId);
      const client = updatedAppointment.client;
      const bot = new TelegramBot(botSetting.botToken, { polling: false });

      await bot.sendMessage(client.telegramId, "🎉");
      await bot.sendMessage(
        client.telegramId,
        `✅*Ваш мастер подтвердил запись!*✅

*${client.name}*, жду вас 📆 *${updatedAppointment.day.split("-")[2]}.${
          updatedAppointment.day.split("-")[1]
        }* в *${updatedAppointment.hour}:00*

Пожалуйста не опаздывайте.
Если что-то изменится дайте мне знать.`,
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "Вернуться на главную ↩️", callback_data: "back" }],
            ],
          },
        }
      );

      sendNotification({ updatedAppointment, bot, client, botSetting });
    }

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
