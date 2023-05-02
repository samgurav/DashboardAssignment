import express from "express";
const router = express.Router();

import userRoutes from "./userRoutes";
import courseRoutes from "./courseRoutes";
import TrainerRoutes from "./TrainerRoutes";
import InternRoutes from "./internRoutes";
import PaymentRoutes from "./paymentRoutes";

router.use("/user", userRoutes);
router.use("/course", courseRoutes);
router.use("/trainer", TrainerRoutes);
router.use("/intern", InternRoutes);
router.use("/payment", PaymentRoutes);

export default router;
