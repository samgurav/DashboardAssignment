import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";
let { validationResult } = require("express-validator");

export class Responder {
  constructor() {}

  respond(
    req: Request,
    res: Response,
    status: boolean,
    statusCode: Number,
    message: string,
    data = [],
    error = ""
  ) {
    return status
      ? res.json({ status, statusCode, data, message })
      : res.json({ status, statusCode, message, data, error });
  }

  respondWithSuccess(req: Request, res: Response, data = [], message = "") {
    res.status(200);
    return this.respond(req, res, true, 200, message, data, "");
  }

  respondWithFalseSuccess(
    req: Request,
    res: Response,
    data = [],
    message = ""
  ) {
    res.status(200);
    return this.respond(req, res, false, 200, message, data, "");
  }

  respondWithError(
    req: Request,
    res: Response,
    error: String,
    sendMail = true
  ) {
    res.status(500);
    return this.respond(req, res, false, 500, error.toString());
  }

  respondWithCustomError(
    req: Request,
    res: Response,
    message: String,
    data = []
  ) {
    res.status(400);
    return this.respond(req, res, false, 400, message.toString(), data);
  }
  respondWithValidationError(req: Request, res: Response, error: string) {
    res.status(422);
    return this.respond(
      req,
      res,
      false,
      422,
      "validation failed",
      undefined,
      error
    );
  }
  errorFormatter = ({ msg }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };

  validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req).formatWith(this.errorFormatter);
    if (!errors.isEmpty()) {
      return this.respondWithValidationError(req, res, errors.mapped());
    }
    next();
  }
}
