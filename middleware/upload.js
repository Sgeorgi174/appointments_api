const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Функция для динамической генерации пути в зависимости от userId
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user.id;
    const userFolderPath = path.join(__dirname, `../uploads/${userId}`);

    // Проверяем наличие каталога и создаем его, если он не существует
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    cb(null, userFolderPath);

    req.file = file;
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;