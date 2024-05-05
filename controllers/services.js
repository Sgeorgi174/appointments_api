const { prisma } = require("../prisma/prisma_client");

const addService = async (req, res) => {
  const { name, cost, duration, categoryId } = req.body;
  const userId = req.user.id;

  if (!name || !cost || !duration || !categoryId) {
    return res.status(400).json({ error: "Не полученны обязательные данные" });
  }

  try {
    const service = await prisma.service.create({
      data: {
        name,
        cost: parseInt(cost),
        categoryId: parseInt(categoryId),
        duration: parseInt(duration),
        userId,
      },
    });

    return res.status(201).json(service);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the service." });
  }
};

const editService = async (req, res) => {
  const { name, cost, duration, id, categoryId } = req.body;
  const userId = req.user.id;

  if (!name || !cost || !duration || !categoryId || !id) {
    return res.status(400).json({ error: "Не полученны обязательные данные" });
  }

  try {
    const service = await prisma.service.update({
      where: {
        id: parseInt(id),
        userId,
      },
      data: {
        name,
        cost: parseInt(cost),
        duration: parseInt(duration),
        categoryId: parseInt(categoryId),
      },
    });

    return res.status(200).json(service);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while editing the service." });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "Не полученны обязательные данные" });
  }

  try {
    await prisma.service.delete({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    return res.status(200).json("Deleted");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the service." });
  }
};

module.exports = {
  addService,
  editService,
  deleteService,
};
