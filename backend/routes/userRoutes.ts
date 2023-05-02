import express, { NextFunction, Response } from "express";
const router = express.Router();
import { UserController } from "../controllers/usercontroller";
import { userDetailsSchema } from "../models/userSchema";
import { Responder } from "../helpers/responder";
import { UserValidation } from "../validations/Validation";

const multer = require("multer");
const responder = new Responder();
const validation = new UserValidation();

const UserControllers = new UserController();
var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./Images/");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + file.originalname);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/adduser", UserControllers.SignUp);
router.post("/socialuser", UserControllers.SocialLogin);
router.post(
  "/login",
  validation.login(),
  responder.validate.bind(responder),
  UserControllers.Login
);
router.post("/getuser", UserControllers.getUser);
router.post("/updatephoto", UserControllers.UpdatePhoto);
router.post(
  "/updateuser",
  validation.updateuser(),
  responder.validate.bind(responder),
  UserControllers.UpdateUser
);

export default router;
