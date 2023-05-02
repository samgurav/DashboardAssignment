import express from "express";
const router = express.Router();
import { CourseController } from "../controllers/coursecontroller";
import { userDetailsSchema } from "../models/userSchema";
import { lessonDetailsSchema } from "../models/LessonSchema";
import { UserValidation } from "../validations/Validation";
import { Responder } from "../helpers/responder";

const nodemailer = require("nodemailer");
const validation = new UserValidation();
const CourseControllers = new CourseController();
const responder = new Responder();

router.post(
  "/addcourse",
  validation.addcourse(),
  responder.validate.bind(responder),
  CourseControllers.AddCourse
);
router.get("/getcourse", CourseControllers.getCourse);
router.post("/updatecourse", CourseControllers.updateCourse);
router.post("/deletecourse", CourseControllers.deleteCourse);
router.post("/addlesson", CourseControllers.AddLesson);
router.post("/getlesson", CourseControllers.getLesson);
router.post("/addassignment", CourseControllers.AddAssignment);
router.post("/getassignment", CourseControllers.getAssignment);
router.post("/getsinglelesson", CourseControllers.getSIngleLesson);
router.post("/addanswer", CourseControllers.addAnswer);

export default router;
