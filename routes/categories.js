const express = require("express");
const { auth } = require("../middleware/auth");
const {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = express.Router();

router.post("/add", auth, addCategory);
router.get("/get", auth, getCategories);
router.put("/edit", auth, editCategory);
router.delete("/delete", auth, deleteCategory);

module.exports = router;
