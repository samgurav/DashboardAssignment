// const bcrypt = require("bcrypt");

import { NextFunction, Response } from "express";
import { userDetailsSchema } from "../models/userSchema";
import { couseDetailsSchema } from "../models/CourseSchema";

export class TrainerService {
  constructor() {}
  public GetTrainer = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const Exist = await userDetailsSchema.find({
      role: "trainer",
    });

    result.status = true;
    result.data = Exist;
    return result;
  };
  public DeleteTrainer = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    let { index, value } = req.body;
    let courseData = await userDetailsSchema.deleteOne({ _id: value });
    let data = await couseDetailsSchema.updateMany(
      { trainer: value },
      { $set: { trainer: null } }
    );
    if (courseData) {
      result.status = true;
      return result;
    } else {
      result.status = false;
      result.Data = "Id Not Found";
      return result;
    }
  };
  public UpdateTrainer = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const Data: any = await userDetailsSchema.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          role: "trainer",
          password: req.body.password,
        },
      },
      { new: true }
    );
    result.data = Data;
    return result;
  };
}
