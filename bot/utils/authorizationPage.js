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

const sendAuthorizationData = async (email, password) => {
  const url = "http://localhost:8000/api/user/login";
  const data = { email, password };

  const response = await axios.post(url, data);
  return response;
};

const editSetting = async (chatId, settingId) => {
  const url = "http://localhost:8000/api/bot/setting/addTid";
  const data = { telegramId: chatId, id: settingId };

  const response = await axios.put(url, data);
  return response;
};

module.exports = { authorizationPage, editSetting, sendAuthorizationData };
