import { Router } from "express";
import { vehicleController } from "./Vehicle.controller";

const router = Router();

router.post("/", vehicleController.VehicleCreate)

export const VehicleRouter = router;