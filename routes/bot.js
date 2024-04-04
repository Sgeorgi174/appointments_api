const express = require("express");
const { exec } = require("child_process");
const { auth } = require("../middleware/auth");
const { prisma } = require("../prisma/prisma_client");
const { startBot } = require("../controllers/startBot");

const router = express.Router();

router.get("/start", auth, startBot);

module.exports = router;

// async (req, res) => {
//   try {
//     const setting = await prisma.userBotSettings.findFirst({
//       where: {
//         userId: req.user.id,
//       },
//     });

//     const token = setting.botToken;

//     const command = `node bot.js ${token}`;
//     // Выполняем команду в терминале
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Ошибка при выполнении команды: ${error.message}`);
//         res.status(500).send(`Ошибка при выполнении команды: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.error(`Команда завершилась с ошибкой: ${stderr}`);
//         res.status(500).send(`Команда завершилась с ошибкой: ${stderr}`);
//         return;
//       }
//       console.log(`Команда успешно выполнена: ${stdout}`);
//       res.send(`Команда успешно выполнена: ${stdout}`);
//     });
//   } catch (error) {
//     console.error(`Ошибка при запросе настройки бота: ${error.message}`);
//     res.status(500).send(`Ошибка при запросе настройки бота: ${error.message}`);
//   }
// }
