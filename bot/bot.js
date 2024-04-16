process.env["NTBA_FIX_350"] = 1;
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { getSettings } = require("./utils/getSettings");
const { getServices } = require("./utils/getServices");
const { createServicesList } = require("./utils/createServicesMessage");
const { startPage } = require("./utils/startPage");

const app = express();

// Конфигурация для каждого бота
const args = process.argv.slice(2);
const tokenArg = args.find((arg) => arg.startsWith("--token="));
const portArg = args.find((arg) => arg.startsWith("--port="));
const userIdArg = args.find((arg) => arg.startsWith("--userId="));

const token = tokenArg ? tokenArg.split("=")[1] : "";
const port = portArg ? parseInt(portArg.split("=")[1]) : 3000;
const userId = userIdArg ? userIdArg.split("=")[1] : "";

const start = async () => {
  const settingsData = await getSettings(userId);
  const userSetting = settingsData.data;

  const servicesData = await getServices(userId);
  const userServices = servicesData.data;

  if (!token || !port) {
    console.log("Не верные token или port");
    return;
  }

  if (!userSetting) {
    console.log("Не верные настройки");
    return;
  }

  const bot = new TelegramBot(token, {
    polling: true,
  });

  const greetingText = userSetting.greetingText;
  const greetingFile = userSetting.greetingFileUrl;
  const contactInform = userSetting.address;
  const contactInformFile = userSetting.addressFileUrl;
  const notificationText = userSetting.notificationText;
  const notificationFile = userSetting.notificationFileUrl;

  const returnButton = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: "🔙 Вернуться", callback_data: "back" }]],
    }),
  };

  // Обработка сообщений для каждого бота
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "Я победил, тебя") {
      await bot.sendMessage(chatId, "нет я победил");
    }

    if (text === "/start") {
      await startPage({
        bot,
        greetingFile,
        greetingText,
        chatId,
        userId,
      });
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    if (data === "contacts") {
      await bot.sendPhoto(chatId, `.${contactInformFile}`, {
        ...returnButton,
        caption: contactInform,
      });
    }

    if (data == "services") {
      await bot.sendMessage(
        chatId,
        createServicesList(userServices),
        returnButton
      );
    }

    if (data === "back") {
      await startPage({
        bot,
        greetingFile,
        greetingText,
        chatId,
        userId,
      });
    }
  });
};

start();

// Дополнительные обработчики запросов и настройки сервера...

app.listen(port, () => {
  console.log(`Главный сервер запущен на порту ${port}`);
});
