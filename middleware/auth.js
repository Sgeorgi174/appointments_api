const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma_client");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Токен отсутствует");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  auth,
};
