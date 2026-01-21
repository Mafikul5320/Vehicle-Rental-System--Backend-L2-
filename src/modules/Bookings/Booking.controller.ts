import { Request, Response } from "express";
import { BookingService } from "./Booking.service";
import { JwtPayload } from "jsonwebtoken";

const CreateBooking = async (req: Request, res: Response) => {
    const result = await BookingService.CreateBooking(req.body);

    try {
        res.send({
            message: "Vehicle Booking sucessfull",
            sucess: true,
            data: result,
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }

};

const AllBooking = async (req: Request, res: Response) => {

    const result = await BookingService.AllBooking(req.user as JwtPayload);
    try {
        res.send({
            message: "All Vehicle Booking Get sucessfull",
            sucess: true,
            data: result,
        })

    } catch (err: any) {
        res.status(500).json({
            sucess: false,
            error: err.message,
        })
    }
}

export const BookingController = {
    CreateBooking,
    AllBooking
}