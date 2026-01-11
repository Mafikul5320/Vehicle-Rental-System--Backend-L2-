import { Router } from "express";
import { vehicleController } from "./Vehicle.controller";
import Middleware from "../../middleware/auth";

const router = Router();

router.post("/", Middleware("admin"), vehicleController.VehicleCreate)

export const VehicleRouter = router;