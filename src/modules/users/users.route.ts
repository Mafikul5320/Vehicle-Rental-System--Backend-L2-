import express from 'express'
import { userController } from './users.controller';

const router = express.Router();

router.post("/signup", userController.userCreate);

export const userRouter = router;