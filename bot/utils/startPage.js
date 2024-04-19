const startPage = async ({
  bot,
  chatId,
  greetingFile,
  greetingText,
  userId,
}) => {
  return greetingFile
    ? await bot.sendPhoto(chatId, `.${greetingFile}`, {
        caption: greetingText,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "☎️ Контакты", callback_data: "contacts" },
              { text: "Отменить запись", callback_data: "services" },
              { text: "Услуги и цены", callback_data: "services" },
            ],
            [
              {
                text: "📆 Записаться",
                web_app: {
                  url: `https://мои-записи.рф/appointment/${userId}`,
                },
              },
            ],
          ],
        },
      })
    : await bot.sendMessage(chatId, greetingText, {
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
                  url: `https://мои-записи.рф/appointment/${userId}`,
                },
              },
            ],
          ],
        },
      });
};

module.exports = { startPage };
