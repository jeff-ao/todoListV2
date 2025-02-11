import Router from "express";
import userController from "../controller/userController";

const router = Router();

router.post("/", (req, res) => {
  userController.register(req, res);
});
router.post("/login", (req, res) => {
  userController.login(req, res);
});

export default router;
