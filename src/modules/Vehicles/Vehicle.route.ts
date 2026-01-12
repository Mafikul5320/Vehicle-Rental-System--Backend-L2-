import { Router } from "express";
import { vehicleController } from "./Vehicle.controller";
import Middleware from "../../middleware/auth";

const router = Router();

router.post("/", Middleware("admin"), vehicleController.VehicleCreate);
router.get("/", vehicleController.allVehicle);
router.get("/:vehicleId", vehicleController.singleVehicle);
router.put("/:vehicleId", Middleware("admin"), vehicleController.updateVehicle);
router.delete("/:vehicleId", Middleware("admin"), vehicleController.deleteVehicle);



export const VehicleRouter = router;