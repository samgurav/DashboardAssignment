import { NextFunction, Request, Response } from "express";
import { Responder } from "../helpers/responder";
import { CourseService } from "../services/courseservice";
import { InternServices } from "../services/internservice";

const responder = new Responder();
const internServices = new InternServices();
// const UserServices = new UserService();

export class InternController {
  constructor() {}
  public getIntern = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await internServices.getIntern(req, res, next);
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
  public getAssignedCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await internServices.getAssignedCourse(req, res, next);
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
  public RaiseQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await internServices.RaiseQuery(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Query Raised Successfully, Respective Trainer will revert back within 24Hours."
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public GetRegisteredStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await internServices.GetRegisteredStudent(req, res, next);
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
}
