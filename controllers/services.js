const { prisma } = require("../prisma/prisma_client");

const add = async (req, res) => {
  const { name, description, price, duration } = req.body;

  const service = await prisma.services.create({
    data: {
      name,
      description,
      price: parseInt(price),
      duration: parseInt(duration),
    },
  });

  return res.status(201).json(service);
};

module.exports = { add };
