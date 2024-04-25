const { prisma } = require("../prisma/prisma_client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверка обязательных полей
    if (!email || !password) {
      throw new Error("Пожалуйста, заполните обязательные поля");
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Некорректный формат email" });
    }

    // Поиск пользователя в базе данных
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Пользователь с таким email не найден");
    }

    // Проверка правильности пароля
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Неверный пароль");
    }

    // Создание JWT токена
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("Не удалось получить секретный ключ для JWT");
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "30d" });

    // Отправка ответа с данными пользователя и токеном
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.firstName,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(400).json({ message: error.message });
  }
};

const register = async (req, res) => {
  const { email, firstName, password } = req.body;

  try {
    // Проверка обязательных полей
    if (!email || !password || !firstName) {
      throw new Error("Пожалуйста, заполните обязательные поля");
    }

    // Проверка формата email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Некорректный формат email" });
    }

    // Проверка длины пароля
    if (password.length < 8) {
      throw new Error("Пароль должен быть не менее 8 символов");
    }

    // Проверка наличия пользователя с таким email
    const registeredUser = await prisma.user.findFirst({
      where: { email },
    });

    if (registeredUser) {
      throw new Error("Пользователь с таким email уже существует");
    }

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        password: hashedPassword,
      },
    });

    // Генерация JWT токена
    const secret = process.env.JWT_SECRET;
    if (!user || !secret) {
      throw new Error("Не удалось создать пользователя");
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "2d" });

    // Отправка ответа с данными пользователя и токеном
    console.log(user);
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res
      .status(500)
      .json({ message: "Ошибка при получении данных пользователя" });
  }
};

module.exports = {
  login,
  register,
  getUser,
};
