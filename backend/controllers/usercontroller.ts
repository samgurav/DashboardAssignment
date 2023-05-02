import { NextFunction, Request, Response } from "express";
import { Responder } from "../helpers/responder";
import { UserService } from "../services/userservice";
const responder = new Responder();
const UserServices = new UserService();
const processFile = require("../helpers/upload");

export class UserController {
  constructor() {}

  public SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result: any;
      result = await UserServices.SignUp(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          result.message
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public SocialLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await UserServices.SocialLogin(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          result.message
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };

  public Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result: any;
      result = await UserServices.LogIn(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          result.message
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let result: any;
      result = await UserServices.getUser(req, res, next);
      if (result.status) {
        return responder.respondWithSuccess(
          req,
          res,
          result.data,
          result.message
        );
      } else {
        return responder.respondWithCustomError(req, res, result.message);
      }
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public UpdatePhoto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await processFile(req, res);
      let result: any = await UserServices.UpdatePhoto(req, res, next);

      if (!result.status) {
        return responder.respondWithCustomError(
          req,
          res,
          "Photo Updated Successfully"
        );
      }
      return responder.respondWithSuccess(
        req,
        res,
        result,
        "Uploaded the file successfully"
      );
    } catch (err: any) {
      responder.respondWithError(req, res, err);
    }
  };
  public UpdateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let result: any;
      result = await UserServices.UpdateUser(req, res, next);
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
}
