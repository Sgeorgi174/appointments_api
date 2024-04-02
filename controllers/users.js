const { prisma } = require("../prisma/prisma_client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const secret = process.env.JWT_SECRET;

    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
      });
    } else {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }
  } catch {
    res.status(400).json({ message: "Что-то пошло не так" });
  }
};

const register = async (req, res) => {
  const { email, firstName, password, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, заполните обязательные поля" });
  }

  const registeredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (registeredUser) {
    return res
      .status(400)
      .json({ message: "Пользователь, с таким email уже существует" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    },
  });

  const secret = process.env.JWT_SECRET;

  if (user && secret) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName,
      lastName,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
    });
  } else {
    return res.status(400).json({ message: "Неудалось создать пользователя" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  return res.status(200).json(req.user.id);
};

module.exports = {
  login,
  register,
  getUser,
};
