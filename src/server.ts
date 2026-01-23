import express from 'express'
import config from './config'
import { initDB } from './config/DB'
import { userRouter } from './modules/users/users.route';
import { authRouter } from './modules/auth/auth.route';
import { VehicleRouter } from './modules/Vehicles/Vehicle.route';
import { BookingRouter } from './modules/Bookings/Booking.route';
import cron from "node-cron";
import { BookingService } from './modules/Bookings/Booking.service';

const app = express();
app.use(express.json())

initDB();

cron.schedule("0 0 * * *", () => {
    console.log("Running auto-return Booking...");
    BookingService.AutoReturnBookings()
});


// Authentication
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auth", authRouter)

// Vehicles
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/vehicles", VehicleRouter);
app.use("/api/v1/vehicles", VehicleRouter)

// user
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", userRouter);

// Booking 
app.use("/api/v1/bookings", BookingRouter);
app.use("/api/v1/bookings", BookingRouter);
app.use("/api/v1/bookings", BookingRouter)


app.get('/', (req, res) => {
    res.send('Vehicle Rental System')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log("Server conected...")
})