const { prisma } = require("../prisma/prisma_client");
const { getCategoriesByUserId } = require("../utils/getCategoriesByUserId");

const addCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Не заполнено обязательное поле" });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    if (!category) {
      return res.status(500).json({ error: "Не получилось создать категории" });
    }

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await getCategoriesByUserId(userId);

    if (!categories) {
      return res.status(400).json({ error: "Нет категорий" });
    }

    return res.status(201).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

const editCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id, name } = req.body;

    const category = await prisma.category.update({
      where: { id: parseInt(id), userId: parseInt(userId) },
      data: { name },
    });

    if (!category) {
      return res.status(400).json({ error: "Не удалось обновить категорию" });
    }

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    console.log(id);

    // Проверка на наличие услуг в категории
    const categoryWithServices = await prisma.category.findUnique({
      where: { id: parseInt(id), userId },
      include: { services: true },
    });

    if (categoryWithServices.services.length > 0) {
      return res
        .status(400)
        .json({ error: "Категория содержит услуги и не может быть удалена" });
    }

    const category = await prisma.category.delete({
      where: { id: parseInt(id), userId },
    });

    if (!category) {
      return res.status(400).json({ error: "Не удалось удалить категорию" });
    }

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Произошла ошибка на сервере" });
  }
};

module.exports = { addCategory, getCategories, editCategory, deleteCategory };
