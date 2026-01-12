import { Request, Response } from "express";
import { userService } from "./users.service";
import { JwtPayload } from "jsonwebtoken";

const userCreate = async (req: Request, res: Response) => {
    const result = await userService.userCreate(req.body);
    try {

        console.log(result.rows[0]);
        res.send({
            message: "user insert sucessfull",
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
        res.send({
            message: "All user get sucessfull",
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

}

export const userController = {
    userCreate,
    allUsers,
    updateUser
}