// const bcrypt = require("bcrypt");
import { userDetailsSchema } from "../models/userSchema";

import { NextFunction, Response } from "express";
const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwtSecretKey = "*ahskimas0617#$#6012nahtnam#";
export class UserService {
  constructor() {}
  public SignUp = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const userExist = await userDetailsSchema.findOne({
      email: req.body.email,
    });
    if (userExist) {
      result.status = false;
      result.message = "User already exist";
      return result;
    }
    if (req.body.role === "trainer") {
      const deviceData = await new userDetailsSchema({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: "trainer",
        email: req.body.email,
      }).save();
      result.data = deviceData;
      result.message = "Trainer Registered Successfully";
      return result;
    } else {
      const deviceData = await new userDetailsSchema(req.body).save();
      result.message = "User Registered Successfully";
      result.data = deviceData;
      return result;
    }
  };
  public SocialLogin = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const userExist: any = await userDetailsSchema.findOne({
      email: req.body.email,
      role: "intern",
    });
    if (userExist) {
      let payload = {
        uid: req.body.email,
        name: userExist.name,
        lname: userExist.username,
        photo: userExist.photo,
        id: userExist._id,
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });

      result.status = true;
      result.message = `" ${userExist.name} You have logged In Successfully"`;
      result.data = token;
      return result;
    } else {
      const userExist = await new userDetailsSchema({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        role: "intern",
        photo: req.body.photo,
        password: req.body.password,
      }).save();
      let payload = {
        uid: req.body.email,
        name: req.body.name,
        lname: req.body.username,
        photo: req.body.photo,
        id: userExist._id,
      };
      const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });

      result.status = true;
      result.message = `" ${userExist.name} You have logged In Successfully"`;
      result.data = token;
      return result;
    }
  };

  public LogIn = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: "",
      token: "",
      message: "",
    };
    if (req.body.role === "intern") {
      const userExist: any = await userDetailsSchema.findOne({
        email: req.body.email,
        role: req.body.role,
      });
      if (!userExist) {
        result.status = false;
        result.message = "User not found";
        return result;
      }
      if (bcrypt.compareSync(req.body.password, userExist.password)) {
        let payload = {
          uid: req.body.email,
          name: userExist.name,
          lname: userExist.username,
          photo: userExist.photo,
          id: userExist._id,
        };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });

        result.status = true;
        result.message = `" ${userExist.name} You have logged In Successfully"`;
        result.data = token;
        return result;
      } else {
        result.status = false;
        result.message = "enter correct password";
        return result;
      }
      return result;
    } else if (req.body.role === "admin") {
      const userExist: any = await userDetailsSchema.findOne({
        email: req.body.email,
        role: req.body.role,
      });
      if (!userExist) {
        result.status = false;
        result.message = "admin not found";
        return result;
      }
      if (bcrypt.compareSync(req.body.password, userExist.password)) {
        let payload = {
          uid: req.body.email,
          name: userExist.name,
          lname: userExist.username,
          photo: userExist.photo,
          id: userExist._id,
        };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });
        result.status = true;
        result.message = `Admin LoggedIn Successfully`;
        result.data = token;
        // result.token = token;
        return result;
      } else {
        result.status = false;
        result.message = "enter correct password";
        return result;
      }
      return result;
    } else if (req.body.role === "trainer") {
      const userExist: any = await userDetailsSchema.findOne({
        email: req.body.email,
        role: req.body.role,
      });
      if (!userExist) {
        result.status = false;
        result.message = "trainer not found";
        return result;
      }
      if (bcrypt.compareSync(req.body.password, userExist.password)) {
        let payload = {
          uid: req.body.email,
          name: userExist.name,
          lname: userExist.username,
          photo: userExist.photo,
          id: userExist._id,
        };
        const token = jwt.sign(payload, jwtSecretKey, { expiresIn: 360000 });
        result.status = true;
        result.message = `Trainer LoggedIn Successfully`;
        result.data = token;
        // result.token = token;
        return result;
      } else {
        result.status = false;
        result.message = "enter correct password";
        return result;
      }
      return result;
    }
  };
  public getUser = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: "",
      token: "",
      message: "",
    };
    const { id } = req.body;
    if (!id) {
      result.status = false;
      result.message = "User Not found";
      return result;
    }
    const Exist = await userDetailsSchema.findOne({ _id: id });

    result.status = true;
    result.data = Exist;
    return result;
  };
  public UpdatePhoto = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: "",
      token: "",
      message: "",
    };
    const { id } = req.body;

    const url =
      req.protocol + "://" + req.get("host") + "/Images/" + req.file.filename;
    const Data: any = await userDetailsSchema.updateOne(
      { _id: id },
      {
        $set: {
          photo: url,
        },
      },
      { new: true }
    );
    result.data = Data;
    return result;
  };
  public UpdateUser = async (req: any, res: Response, next: NextFunction) => {
    const { name, username, id } = req.body;
    let result: any = {
      status: true,
      data: "",
      token: "",
      message: "",
    };
    if (!id) {
      result.status = false;
      result.message = "user Not Found";
      return result;
    }
    const Data: any = await userDetailsSchema.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
          username: username,
        },
      },
      { new: true }
    );
    result.data = Data;
    return result;
  };
}
