import { Router } from "express";
import { getCategories, getCategoryByIdController, createCategoryController, deleteCategoryController, updateCategoryController } from "../../controllers/categoriesController";

const router = Router();


router.get('/', getCategories);
router.get('/:id', getCategoryByIdController);
router.post('/', createCategoryController);
router.put('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export default router;