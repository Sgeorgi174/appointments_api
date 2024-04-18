const schedule = require("node-schedule");

const sendNotification = async ({
  updatedAppointment,
  bot,
  client,
  botSetting,
}) => {
  const appointmentDate = new Date(
    `${updatedAppointment.day}T${updatedAppointment.hour}:00:00`
  );
  console.log(appointmentDate);

  // Создайте новую дату на основе даты встречи
  const notificationDate = new Date(appointmentDate.getTime());

  // Установите время уведомления на 20:00 предыдущего дня
  notificationDate.setDate(notificationDate.getDate() - 1);
  notificationDate.setHours(18, 38, 0, 0);
  console.log(notificationDate);

  if (notificationDate >= new Date()) {
    const job = schedule.scheduleJob(notificationDate, function () {
      bot.sendPhoto(client.telegramId, `.${botSetting.notificationFileUrl}`, {
        caption: botSetting.notificationText.replace(
          "-время-",
          `*${updatedAppointment.hour}:00*`
        ),
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [[{ text: "Отлично!", callback_data: "back" }]],
        },
      });
    });
  }
};

module.exports = { sendNotification };
