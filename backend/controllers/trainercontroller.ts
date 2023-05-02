import { NextFunction, Request, Response } from "express";
import { Responder } from "../helpers/responder";
import { TrainerService } from "../services/trainerservices";

const responder = new Responder();
const TrainerServices = new TrainerService();
// const UserServices = new UserService();

export class TrainerController {
  constructor() {}

  public getTrainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await TrainerServices.GetTrainer(req, res, next);
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
  public DeleteTrainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await TrainerServices.DeleteTrainer(req, res, next);
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
  public UpdateTrainer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await TrainerServices.UpdateTrainer(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          "Data Updated Successfully"
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
}
