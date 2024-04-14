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
  },
  filename: (req, file, cb) => {
    const userId = req.user.id;
    const fileName = `${file.fieldname}_${userId}${path.extname(
      file.originalname
    )}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Проверяем тип и размер файла
    if (file.mimetype !== "image/jpeg" || file.size > 10 * 1024 * 1024) {
      return cb(new Error("Неверный тип файла или слишком большой размер"));
    }
    cb(null, true);
  },
});

module.exports = upload;
