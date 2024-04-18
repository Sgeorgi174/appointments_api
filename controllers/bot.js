const { prisma } = require("../prisma/prisma_client");
const { exec } = require("child_process");

const startBot = async (req, res) => {
  const userId = req.user.id;
  const settings = await prisma.userBotSettings.findFirst({
    where: {
      userId,
    },
  });

  exec(
    `pm2 start ./bot/bot.js --name "Bot_${userId}" -- --token=${settings.botToken} --userId=${userId} --port=${settings.port}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Ошибка: ${error.message}`);
        res.status(500).send("Ошибка при запуске бота");
        return;
      }
      if (stderr) {
        console.error(`Ошибка stderr: ${stderr}`);
        res.status(500).send("Ошибка при запуске бота");
        return;
      }
      console.log(`Стандартный вывод: ${stdout}`);
      res.send("Бот успешно запущен");
    }
  );

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isStartBot: true,
    },
  });
};

const stopBot = async (req, res) => {
  const userId = req.user.id;

  exec(`pm2 delete Bot_${userId}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка: ${error.message}`);
      res.status(500).send("Ошибка при запуске бота");
      return;
    }
    if (stderr) {
      console.error(`Ошибка stderr: ${stderr}`);
      res.status(500).send("Ошибка при запуске бота");
      return;
    }

    console.log(`Стандартный вывод: ${stdout}`);
    res.send("Бот успешно остановлен");
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isStartBot: false,
    },
  });
};

module.exports = {
  startBot,
  stopBot,
};
