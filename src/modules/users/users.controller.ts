import { Request, Response } from "express";
import { userService } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

const userCreate = async (req: Request, res: Response) => {
    const result = await userService.userCreate(req.body);
    try {

        console.log(result.rows[0]);
        res.status(201).send({
            message: "User registered successfully",
            sucess: true,
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};

const allUsers = async (req: Request, res: Response) => {
    const result = await userService.allUser();

    try {
        res.status(200).send({
            message: "Users retrieved successfully",
            sucess: true,
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};

const updateUser = async (req: Request, res: Response) => {
    const user = req.user;
    const paramsId = Number(req.params.userId)
    const result = await userService.updateUser(req.body, user as JwtPayload, paramsId);
    console.log(result)
    try {

        console.log(result.rows[0]);
        res.send({
            message: "user Update sucessfull",
            sucess: true,
            data: result.rows
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }

};

const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const result = await userService.deleteUser(userId as string);

    try {
        res.send({
            message: "User deleted successfully",
            sucess: true,
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }

}

export const userController = {
    userCreate,
    allUsers,
    updateUser,
    deleteUser
}