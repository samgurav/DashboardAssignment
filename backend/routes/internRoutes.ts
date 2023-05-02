import express from "express";
const router = express.Router();
import { InternController } from "../controllers/interncontroller";

const InternControllers = new InternController();

router.get("/getintern", InternControllers.getIntern);
router.post("/getassignedcourses", InternControllers.getAssignedCourse);
router.post("/raisequery", InternControllers.RaiseQuery);
router.post("/getregisteredstudent", InternControllers.GetRegisteredStudent);

export default router;
