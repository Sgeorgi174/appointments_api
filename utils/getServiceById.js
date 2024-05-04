const { prisma } = require("../prisma/prisma_client");

const getServiceById = async (serviceId) => {
  const service = await prisma.service.findUnique({
    where: { id: parseInt(serviceId) },
  });

  if (!service) {
    throw new Error("Услуга не найдена");
  }

  return service;
};

module.exports = { getServiceById };
