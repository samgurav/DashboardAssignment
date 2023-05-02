import { NextFunction, Response } from "express";
import { couseDetailsSchema } from "../models/CourseSchema";
import { lessonDetailsSchema } from "../models/LessonSchema";
import { userDetailsSchema } from "../models/userSchema";
const nodemailer = require("nodemailer");

export class CourseService {
  constructor() {}
  public AddCourse = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const Exist = await couseDetailsSchema.findOne({
      title: req.body.title,
    });
    if (Exist) {
      result.status = false;
      result.message = "Already Exist";
      return result;
    }
    const Data = await new couseDetailsSchema(req.body).save();
    result.data = Data;
    return result;
  };
  public GetCourse = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const Exist = await couseDetailsSchema.find({});

    result.status = true;
    result.data = Exist;
    return result;
  };
  public updateCourse = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const Data: any = await couseDetailsSchema.updateOne(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          duration: req.body.duration,
          trainer: req.body.trainer,
          fees: req.body.fees,
        },
      },
      { new: true }
    );
    result.data = Data;
    return result;
  };
  public deleteCourse = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    let { index, value } = req.body;
    let courseData = await couseDetailsSchema.deleteOne({ _id: value });

    if (courseData) {
      result.status = true;
      return result;
    } else {
      result.status = false;
      result.Data = "Id Not Found";
      return result;
    }
  };
  public AddLesson = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const { data, value } = req.body;

    if (!value._id) {
      result.status = false;
      result.message = "Course Not Found";
      return result;
    }
    const Data = await new lessonDetailsSchema({
      title: data.title,
      description: data.description,
      courseID: value._id,
    }).save();
    result.data = Data;
    return result;
  };
  public getLesson = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const { id } = req.body;
    if (!id) {
      result.status = false;
      return result;
    }
    const Exist = await lessonDetailsSchema.find({ courseID: id });

    result.status = true;
    result.data = Exist;
    return result;
  };
  public AddAssignment = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const { data, value } = req.body;

    if (!value._id) {
      result.status = false;
      result.message = "Course Not Found";
      return result;
    }
    const Data: any = await couseDetailsSchema.updateOne(
      { _id: value._id },
      {
        $push: {
          Assignments: data,
        },
      },
      { new: true }
    );
    result.data = Data;
    return result;
  };
  public getAssignment = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };

    const Exist = await couseDetailsSchema.findOne({ _id: req.body.id });

    result.status = true;
    result.data = Exist?.Assignments;
    return result;
  };
  public getSingleLesson = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const { id } = req.body;
    if (!id) {
      result.status = false;
      return result;
    }
    const Exist = await lessonDetailsSchema.findOne({ _id: id });

    result.status = true;
    result.data = Exist?.doubts;
    return result;
  };

  public Addanswer = async (req: any, res: Response, next: NextFunction) => {
    let result: any = {
      status: true,
      data: [],
      message: "",
    };
    const data = {
      userID: req.body.data.userID,
      courseID: req.body.data.courseID,
      question: req.body.data.question,
      ID: req.body.doubtID,
      answer: req.body.answer.answer,
    };
    const val = await userDetailsSchema.findOne({
      _id: req.body.data.userID,
    });
    const Exist = await lessonDetailsSchema.updateOne(
      {
        _id: req.body.index,
        "doubts.ID": req.body.doubtID,
      },
      { "doubts.$": data }
    );
    let smtpTransoprt = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    var mailOptions = {
      from: process.env.email,
      to: val?.email,
      subject: "Query Resolved by Exper Trainer !!!",
      html: `
      Hello Student ,
      <h1>Your Query has been resolved by trainer!</h1>
      <img src="https://png.pngtree.com/png-vector/20221015/ourmid/pngtree-employment-agency-for-recruitment-or-placement-job-service-with-skilled-and-png-image_6286449.png" width="100px" height="100px"/>

      <h3>If you have any query, please reach out to us: 012338475494 </h3>
      <h4>Thank you
      Campus to Co-operate,</h4>
      `,
    };
    smtpTransoprt.sendMail(mailOptions, (err: any, info: any) => {
      if (err) {
        result.status = false;
        return result;
      } else {
        console.log("sent successfully");
      }
    });
    smtpTransoprt.close();
    result.status = true;
    return result;
  };
}
