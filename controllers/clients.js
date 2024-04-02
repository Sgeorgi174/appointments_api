const { prisma } = require("../prisma/prisma_client");

const addClient = async (req, res) => {
  const { name, telegramId } = req.body;

  const createdClient = await prisma.client.findFirst({
    where: {
      telegramId,
    },
  });

  if (createdClient) {
    return res.status(200).json({ message: "ok" });
  }

  const client = await prisma.client.create({
    data: {
      name,
      telegramId,
    },
  });

  return res.status(200).json({ message: "клиент создан" });
};

module.exports = {
  addClient,
};
