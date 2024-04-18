const { prisma } = require("../prisma/prisma_client");

const getClientById = async (clientId) => {
  const client = await prisma.client.findFirst({
    where: { id: parseInt(clientId) },
  });

  if (!client) {
    throw new Error("Клиент не найден");
  }

  return client;
};

module.exports = { getClientById };
