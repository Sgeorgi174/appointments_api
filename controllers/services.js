const { prisma } = require("../prisma/prisma_client");

const addService = async (req, res) => {
  const { name, price, duration } = req.body;
  const userId = req.user.id;

  const service = await prisma.services.create({
    data: {
      name,
      price: parseInt(price),
      duration: parseInt(duration),
      userId,
    },
  });

  return res.status(201).json(service);
};

const getServices = async (req, res) => {
  const userId = req.user.id;

  const services = await prisma.services.findMany({ where: { userId } });

  return res.status(200).json(services);
};

const getCurrentServices = async (req, res) => {
  const { userId } = req.params;

  const services = await prisma.services.findMany({
    where: { userId: parseInt(userId) },
  });

  return res.status(200).json(services);
};

const editService = async (req, res) => {
  const { name, price, duration, id } = req.body;
  const userId = req.user.id;

  const service = await prisma.services.update({
    where: {
      id: parseInt(id),
      userId,
    },
    data: { name, price: parseInt(price), duration: parseInt(duration) },
  });

  return res.status(200).json(service);
};

const deleteService = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;

  await prisma.services.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });

  return res.status(200).json("Deleted");
};

module.exports = {
  addService,
  getServices,
  editService,
  deleteService,
  getCurrentServices,
};
