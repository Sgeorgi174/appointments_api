const TelegramBot = require("node-telegram-bot-api");
const { prisma } = require("../prisma/prisma_client");

const startTelegramBot = async (req, res, arg) => {
  //   const { userId } = req.params;
  //   const data = await prisma.userBotSettings.findFirst({
  //     where: {
  //       userId,
  //     },
  //   });

  const token = arg
    ? "7186363861:AAFcRSg_xQaBvtyxGnR4F-aO0MUPpGFmnCI"
    : "6248750475:AAHYuCz7SlmQUhsdcA8u9qyJ5aer9Os-m98";

  const bot = new TelegramBot(token, { polling: true });
  const botName = "ttt";
  //   const address = data.address;
  greetingText = (userName) => `Приветик ${userName}, меня зовут ${botName}.

Я помощница твоего мастера. Она сейчас работает 💅, поэтому я помогу тебе записаться и ответить на все вопросы.
  
Нажми кнопку ниже, чтобы посмотреть работы, цены, адрес и записаться к своему мастеру. 👇`;

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const userName = msg.chat.first_name;

    if (text === "/start") {
      await bot.sendMessage(chatId, greetingText(userName), {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "узнать больше!",
                callback_data: "true",
              },
            ],
          ],
        },
      });
    }
  });

  // Добавьте другую логику вашего бота здесь

  console.log("Telegram bot started");
};

module.exports = { startTelegramBot };
