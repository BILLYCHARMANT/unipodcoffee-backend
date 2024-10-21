import { Router } from "express";
import { registerUser } from "../../controllers/userController";
import isAuthorized from "../../middleware/isAuthorized.middleware";
import checkRole from "../../middleware/checkRole.middleware";
import { Roles } from "../../util/enum/Roles.enum";

const router = Router();

router.post(
  "/register",
  isAuthorized,
  checkRole([Roles.ADMIN, Roles.SUPERADMIN]),
  registerUser
);

export default router;
