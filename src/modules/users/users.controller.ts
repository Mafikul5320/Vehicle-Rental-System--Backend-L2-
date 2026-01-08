import { Request, Response } from "express";
import { userService } from "./users.service";

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

export const userController = {
    userCreate
}