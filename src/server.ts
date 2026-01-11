import express from 'express'
import config from './config'
import { initDB } from './config/DB'
import { userRouter } from './modules/users/users.route';
import { authRouter } from './modules/auth/auth.route';
import { VehicleRouter } from './modules/Vehicles/Vehicle.route';

const app = express();
app.use(express.json())

initDB();


// Authentication
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auth", authRouter)

// Vehicles
app.use("/api/v1/vehicles",VehicleRouter)


app.get('/', (req, res) => {
    res.send('Vehicle Rental System')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
    console.log("Server conected...")
})