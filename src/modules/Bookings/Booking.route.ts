import { Router } from "express";
import { BookingController } from "./Booking.controller";
import Middleware from "../../middleware/auth";

const router = Router();

router.post("/", BookingController.CreateBooking);
router.get("/",Middleware("customer","admin"),BookingController.AllBooking)




export const BookingRouter = router;