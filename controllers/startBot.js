const { Telegraf } = require("telegraf");
const { prisma } = require("../prisma/prisma_client");

const startBot = async (req, res) => {
  const setting = await prisma.userBotSettings.findFirst({
    where: {
      userId: req.user.id,
    },
  });
  console.log(setting);

  const BOT_TOKEN = setting.botToken;
  const bot = new Telegraf(BOT_TOKEN);

  bot.on("text", (ctx) => {
    ctx.reply("Привет! Это бот. Вот онлайн кнопка для вас:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Записаться",
              web_app: { url: "https://1d91-176-226-199-180.ngrok-free.app" },
            },
          ],
        ],
      },
    });
  });

  bot.launch();
};

module.exports = {
  startBot,
};
