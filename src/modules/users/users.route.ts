import express from 'express'
import { userController } from './users.controller';
import Middleware from '../../middleware/auth';

const router = express.Router();

router.post("/signup", userController.userCreate);
router.get("/", Middleware("admin"), userController.allUsers);
router.put("/:userId", Middleware("admin", "customer"), userController.updateUser)

export const userRouter = router;