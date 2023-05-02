import { NextFunction, Request, Response } from "express";
import { Responder } from "../helpers/responder";
import { CourseService } from "../services/courseservice";
import { UserService } from "../services/userservice";

const responder = new Responder();
const CourseServices = new CourseService();
// const UserServices = new UserService();

export class CourseController {
  constructor() {}

  public AddCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.AddCourse(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Course Added Successfully."
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public getCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.GetCourse(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data fetched Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public updateCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.updateCourse(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data updated Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public deleteCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.deleteCourse(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data Deleted Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public AddLesson = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.AddLesson(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Course Added Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public getLesson = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.getLesson(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data Fetched Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public AddAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.AddAssignment(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Assignment Added Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public getAssignment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.getAssignment(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data Fetched Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public getSIngleLesson = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.getSingleLesson(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data Fetched Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public addAnswer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await CourseServices.Addanswer(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          " Mail Sent to Intern & Answer added Successfully &"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
}
