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
};

const allVehicle = async (req: Request, res: Response) => {
    const result = await vehicleService.allVehicle();

    try {

        console.log(result.rows[0]);
        res.send({
            message: "user Get sucessfull",
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

const singleVehicle = async (req: Request, res: Response) => {
    const result = await vehicleService.singlevehicle(req.params);

    try {

        console.log(result.rows[0]);
        if (result.rows.length) {
            res.send({
                message: "Single Vehicle Get sucessfull",
                sucess: true,
                data: result.rows[0]
            })
        } else {
            res.send({
                message: "Vehicle Not found",
                sucess: false,
            })
        }

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
};

const updateVehicle = async (req: Request, res: Response) => {
    const id: number = Number(req.params.vehicleId);
    const result = await vehicleService.updateVehicle(id, req.body)
    try {

        console.log(result.rows[0]);
        res.send({
            message: "vehicle Update sucessfull",
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

const deleteVehicle = async (req: Request, res: Response) => {
    const id: number = Number(req.params.vehicleId);
    const result = await vehicleService.deleteVehicle(id)
    try {

        console.log(result.rows[0]);
        res.send({
            message: "vehicle delete sucessfull",
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

export const vehicleController = {
    VehicleCreate,
    allVehicle,
    singleVehicle,
    updateVehicle,
    deleteVehicle
}