const { prisma } = require("../prisma/prisma_client");

const getServicesByCategory = async (categoryId, userId) => {
  const services = await prisma.service.findMany({
    where: { userId: parseInt(userId), categoryId: parseInt(categoryId) },
  });

  if (!services) {
    throw new Error("Услуга не найдена");
  }

  return services;
};

module.exports = { getServicesByCategory };
