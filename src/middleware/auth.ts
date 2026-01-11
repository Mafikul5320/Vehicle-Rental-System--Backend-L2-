import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const Middleware = (...role: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized" });
        };
        const token = authHeader.split(" ")[1];
        console.log(token);
        try {
            if (token) {
                const decoded = jwt.verify(token, config.secretPrivateKey as string) as JwtPayload
                req.user = decoded;
                console.log(decoded.role);
                if (role.length && !role.includes(decoded.role)) {
                    return res.status(500).json({
                        sucess: false,
                        error: "Unauthorized...",
                    })
                }
                next()
            }
        } catch (error: any) {
            res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
        }
    }
}

export default Middleware;