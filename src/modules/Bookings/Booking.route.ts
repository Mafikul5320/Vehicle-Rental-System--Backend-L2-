import { Router } from "express";
import { BookingController } from "./Booking.controller";

const router = Router();

router.post("/", BookingController.CreateBooking);




export const BookingRouter = router;