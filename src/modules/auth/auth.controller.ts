import { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);
    try {
        if (result) {
            res.send({
                message: "user Find sucessfull",
                sucess: true,
                data: result
            })
        }

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};

export const authController = {
    loginUser,
}