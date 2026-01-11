import { Request, Response } from "express";
import { vehicleService } from "./Vehicle.service";

const VehicleCreate = async (req: Request, res: Response) => {
    const result = await vehicleService.VehicleCreate(req.body)
    try {

        console.log(result.rows[0]);
        res.send({
            message: "vehicle insert sucessfull",
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

export const vehicleController = {
    VehicleCreate
}