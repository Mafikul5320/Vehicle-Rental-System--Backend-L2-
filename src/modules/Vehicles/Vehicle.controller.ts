import { Request, Response } from "express";
import { vehicleService } from "./Vehicle.service";

const VehicleCreate = async (req: Request, res: Response) => {
    const result = await vehicleService.VehicleCreate(req.body)
    try {

        console.log(result.rows[0]);
        res.status(201).send({
            message: "Vehicle created successfully",
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
        if (result.rows.length) {
            res.status(200).send({
                message: "Vehicles retrieved successfully",
                sucess: true,
                data: result.rows
            })
        } else {
            res.status(200).send({
                sucess: true,
                message: "No vehicles found",
                data: result.rows
            })
        }

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
                message: "Vehicle retrieved successfully",
                sucess: true,
                data: result.rows[0]
            })
        } else {
            res.send({
                sucess: true,
                message: "Vehicle Not found",
                data: result.rows
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
            message: "Vehicle updated successfully",
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

        res.send({
            sucess: true,
            message: "Vehicle deleted successfully",
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