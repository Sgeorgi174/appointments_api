const axios = require("axios");

const authorizationPage = async ({ bot, chatId }) => {
  return await bot.sendMessage(
    chatId,
    `Бот не авторизован! Пожалуйста, авторизуйтесь`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Авторизоваться", callback_data: "auth" }]],
      },
    }
  );
};

const sendAuthorizationData = async (email, password, chatId, bot) => {
  const url = "https://мои-записи.рф/api/user/login";
  const data = { email, password };

  try {
    const response = await axios.post(url, data);
    editSetting(chatId, userSetting.id);
    States.status = "authorized";
  } catch (error) {
    States = { email: "", password: "", status: "unauthorized" };
    await bot.sendMessage(chatId, "Неверный email или пароль", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Попробовать снова", callback_data: "auth" }],
        ],
      },
    });
  }
};

const editSetting = async (chatId, settingId) => {
  const url = "https://мои-записи.рф/api/bot/setting/addTid";
  const data = { telegramId: chatId, id: settingId };
  try {
    const response = await axios.put(url, data);
    userChatId = chatId;
    await bot.sendMessage(chatId, "Авторизация прошла успешно", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Отлично! Начать работу!", callback_data: "back" }],
        ],
      },
    });
  } catch (error) {
    throw new Error("что-то пошло не так");
  }
};

module.exports = { authorizationPage, editSetting, sendAuthorizationData };
