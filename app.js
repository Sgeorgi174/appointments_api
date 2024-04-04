const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "dist")));

// Обработка всех запросов, отличных от статических файлов, направляется на index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/appointment", require("./routes/appointments"));
app.use("/api/user", require("./routes/users"));
app.use("/api/client", require("./routes/clients"));
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/service", require("./routes/services"));
app.use("/api/bot/setting", require("./routes/botSettings"));
app.use("/api/bot", require("./routes/bot"));

const port = parseInt(process.env.PORT) || 3000;

// Указываем порт, на котором сервер будет слушать запросы
const server = app.listen(port, () => {
  console.log(`Сервер Express запущен и слушает порт ${port}`);
});

// Обработка ошибок, которые могут возникнуть при запуске сервера
server.on("error", (error) => {
  console.error("Ошибка при запуске сервера:", error.message);
});

module.exports = app;
