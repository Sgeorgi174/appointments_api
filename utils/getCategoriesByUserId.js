const { prisma } = require("../prisma/prisma_client");

const getCategoriesByUserId = async (userId) => {
  const categories = await prisma.category.findMany({
    where: { userId: parseInt(userId) },
    include: { services: true },
  });

  if (!categories) {
    throw new Error("Нет категрий");
  }

  return categories;
};

module.exports = { getCategoriesByUserId };
