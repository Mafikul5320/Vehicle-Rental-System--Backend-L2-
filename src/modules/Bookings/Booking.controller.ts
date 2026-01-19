import { Request, Response } from "express";
import { BookingService } from "./Booking.service";

const CreateBooking = async (req: Request, res: Response) => {
    const result = await BookingService.CreateBooking()

    try {
        res.send({
            message: "User Deteted sucessfull",
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

export const BookingController = {
    CreateBooking,
}