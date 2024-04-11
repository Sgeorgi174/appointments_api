const { Telegraf } = require("telegraf");
const { prisma } = require("../prisma/prisma_client");

const startBot = async (req, res) => {
  const userId = req.user.id;
  const setting = await prisma.userBotSettings.findFirst({
    where: {
      userId,
    },
  });
  console.log(setting);

  const BOT_TOKEN = setting.botToken;
  const BOT_NAME = setting.botName;
  const ADDRESS = setting.address;
  const BOT_IMG = setting.imgUrl;
  const bot = new Telegraf(BOT_TOKEN);

  bot.on("text", (ctx) => {
    ctx.reply("Привет! Это бот. Вот онлайн кнопка для вас:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Записаться",
              web_app: {
                url: `https://мои-записи.рф/schedule/${userId}`,
              },
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
