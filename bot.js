const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.argv[2];
const bot = new Telegraf(BOT_TOKEN);

bot.on("text", (ctx) => {
  console.log(ctx);
  ctx.reply("Получено сообщение: " + ctx.message.text);
});

bot.launch();
