import express from "express";
const router = express.Router();
import { TrainerController } from "../controllers/trainercontroller";

const TrainerControllers = new TrainerController();

router.get("/gettrainer", TrainerControllers.getTrainer);
router.post("/deletetrainer", TrainerControllers.DeleteTrainer);
router.post("/updatetrainer", TrainerControllers.UpdateTrainer);

export default router;
