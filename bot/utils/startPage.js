const startPage = async ({
  bot,
  chatId,
  greetingFile,
  greetingText,
  userId,
}) => {
  return await bot.sendPhoto(chatId, `.${greetingFile}`, {
    caption: greetingText,
    reply_markup: {
      inline_keyboard: [
        [
          { text: "☎️ Контакты", callback_data: "contacts" },
          { text: "Услуги и цены", callback_data: "services" },
        ],
        [
          {
            text: "📆 Записаться",
            web_app: {
              url: `https://9901-176-226-202-168.ngrok-free.app/appointment/${userId}`,
            },
          },
        ],
      ],
    },
  });
};

module.exports = { startPage };
