// const bcrypt = require("bcrypt");

import { NextFunction, Response } from "express";
import { userDetailsSchema } from "../models/userSchema";
import { couseDetailsSchema } from "../models/CourseSchema";
import { lessonDetailsSchema } from "../models/LessonSchema";

export class InternServices {
  constructor() {}
  public getIntern = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const Exist = await userDetailsSchema.find({ role: "intern" });

    result.status = true;
    result.data = Exist;
    return result;
  };
  public getAssignedCourse = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const Exist = await couseDetailsSchema
      .find({ trainer: req.body.id })
      .populate("trainer");
    result.status = true;
    result.data = Exist;
    return result;
  };
  public RaiseQuery = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const { question, userID, courseID, lessonID } = req.body;
    const Data: any = await lessonDetailsSchema.updateOne(
      { _id: lessonID },
      {
        $push: {
          doubts: {
            question: question,
            userID: userID,
            courseID: courseID,
            ID: Math.random(),
          },
        },
      },
      { new: true }
    );
    result.status = true;
    result.data = Data;
    return result;
  };
  public GetRegisteredStudent = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const data = await couseDetailsSchema
      .findOne({ _id: req.body.id })
      .populate(["registeredStudents.userID"]);
    result.data = data?.registeredStudents;
    return result;
  };
}
