import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../service/categories.service";

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategory(categoryData);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryData = req.body;
    const updatedCategory = await updateCategory(id, categoryData);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
