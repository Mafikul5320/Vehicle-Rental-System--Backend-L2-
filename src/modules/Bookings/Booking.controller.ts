import { Request, Response } from "express";
import { BookingService } from "./Booking.service";

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

export const BookingController = {
    CreateBooking,
}