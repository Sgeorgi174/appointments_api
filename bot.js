const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

// Конфигурация для каждого бота
const args = process.argv.slice(2);
const tokenArg = args.find((arg) => arg.startsWith("--token="));
const portArg = args.find((arg) => arg.startsWith("--port="));
const userIdArg = args.find((arg) => arg.startsWith("--userId="));

const token = tokenArg ? tokenArg.split("=")[1] : "";
const port = portArg ? parseInt(portArg.split("=")[1]) : 3000;
const userId = userIdArg ? userIdArg.split("=")[1] : "";

const bot = new TelegramBot(token, { polling: true });

// Обработка сообщений для каждого бота
bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userName = msg.chat.first_name;

  const greetingText = (userName) => `Приветик ${userName}, меня зовут Раиса.

Я помощница твоего мастера. Она сейчас работает 💅, поэтому я помогу тебе записаться и ответить на все вопросы.

Нажми кнопку ниже, чтобы посмотреть работы, цены, адрес и записаться к своему мастеру. 👇`;

  if (text === "/start") {
    await bot.sendMessage(chatId, greetingText(userName), {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "узнать больше!",
              web_app: {
                url: `https://b549-176-59-204-23.ngrok-free.app/appointment/${userId}`,
              },
            },
          ],
        ],
      },
    });
  }
});

// Дополнительные обработчики запросов и настройки сервера...

app.listen(port, () => {
  console.log(`Главный сервер запущен на порту ${port}`);
});
