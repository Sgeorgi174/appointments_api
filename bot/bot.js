process.env["NTBA_FIX_350"] = 1;
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const { getSettings } = require("./utils/getSettings");
const { getServices } = require("./utils/getServices");
const { createServicesList } = require("./utils/createServicesMessage");
const { startPage } = require("./utils/startPage");
const {
  authorizationPage,
  sendAuthorizationData,
  editSetting,
} = require("./utils/authorizationPage");

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
  let userChatId = userSetting.telegramId;

  const returnButton = {
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text: "Вернуться ↩️", callback_data: "back" }]],
    }),
  };

  let States = { email: "", password: "", status: "unauthorized" };

  // Обработка сообщений для каждого бота
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (States.status === "awaiting_email") {
      States = { ...States, email: text, status: "awaiting_password" };
      await bot.sendMessage(chatId, "Введите пароль");
    } else if (States.status === "awaiting_password") {
      await sendAuthorizationData(States.email, text)
        .then(() => {
          States = { email: "", password: "", status: "authorized" };
          userChatId = chatId;
          editSetting(chatId, userSetting.id).then(async () => {
            userChatId = chatId;
            await bot.sendMessage(chatId, "Авторизация прошла успешно", {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Отлично! Начать работу!", callback_data: "back" }],
                ],
              },
            });
          });
        })
        .catch(async () => {
          States = { email: "", password: "", status: "unauthorized" };
          await bot.sendMessage(chatId, "Неверный email или пароль", {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Попробовать снова", callback_data: "auth" }],
              ],
            },
          });
        });
    } else if (!userChatId) {
      authorizationPage({ bot, chatId });
    } else {
      if (text === "/start") {
        await startPage({ bot, greetingFile, greetingText, chatId, userId });
      }
    }
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;

    //AUTH
    if (data === "auth" && States.status === "unauthorized") {
      await bot.sendMessage(chatId, "Введите email");
      States.status = "awaiting_email";
    }

    if (data === "contacts") {
      contactInformFile
        ? await bot.sendPhoto(chatId, `.${contactInformFile}`, {
            ...returnButton,
            caption: contactInform,
          })
        : await bot.sendMessage(chatId, contactInform, { ...returnButton });
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
