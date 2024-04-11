const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
require("dotenv").config();

// const options = {
//   key: fs.readFileSync("../../etc/ssl/xn----8sbucdawqnv.xn--p1ai.key"),
//   cert: fs.readFileSync("../../etc/ssl/xn----8sbucdawqnv.xn--p1ai.crt"),
// };

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "dist")));
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Обработка всех запросов, отличных от статических файлов, направляется на index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use("/api/appointment", require("./routes/appointments"));
app.use("/api/user", require("./routes/users"));
app.use("/api/client", require("./routes/clients"));
app.use("/api/timetable", require("./routes/timetable"));
app.use("/api/service", require("./routes/services"));
app.use("/api/bot/setting", require("./routes/botSettings"));
app.use("/api/bot", require("./routes/bot"));

// Указываем порт, на котором сервер будет слушать запросы
// https.createServer(options, app).listen(443, () => {
//   console.log("Сервер запущен на порту 443");
// });

// Обработка ошибок, которые могут возникнуть при запуске сервера

// Создаем HTTP-сервер и прослушиваем порт 8000
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

server.on("error", (error) => {
  console.error("Ошибка при запуске сервера:", error.message);
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
