const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { startTelegramBot } = require("./controllers/startBot");

const app = express();
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/appointment", require("./routes/appointments"));
app.use("/api/user", require("./routes/users"));
app.use("/api/client", require("./routes/clients"));
app.use("/api/service", require("./routes/services"));
app.use("/api/bot", require("./routes/botSettings"));

const port = process.env.PORT || 3000;

// Указываем порт, на котором сервер будет слушать запросы
const server = app.listen(port, () => {
  console.log(`Сервер Express запущен и слушает порт ${port}`);
});

// Обработка ошибок, которые могут возникнуть при запуске сервера
server.on("error", (error) => {
  console.error("Ошибка при запуске сервера:", error.message);
});

module.exports = app;
