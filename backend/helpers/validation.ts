import { CustomValidator } from "express-validator";
// let { body, oneOf, check } = require("express-validator");
import { body, check } from "express-validator";
// const ObjectId from "mongoose"
const ObjectId = require("mongoose").Types.ObjectId;
export class Validation {
  isString(path: any) {
    return body(path)
      .exists()
      .trim()
      .notEmpty()
      .withMessage(`${path ? path : path} is required`)
      .isString()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is incorrect type`
      );
  }
  isDate(path: any) {
    return body(path)
      .exists()
      .isISO8601()
      .toDate()
      .withMessage("Please Add A Valid Date");
  }
  isNumber(path: any) {
    return body(path)
      .exists()
      .trim()
      .notEmpty()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is required`
      )
      .isNumeric()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is incorrect type`
      );
  }
  requiredObjectId(path: any, optional = false) {
    const isValid: CustomValidator = (value) => {
      if (!value || value === undefined || value.trim() === null) {
        return body(path).withMessage(`Please provide a valid ${path}`);
      }

      return ObjectId.isValid(value);
    };
    return body(path)
      .custom(isValid)
      .withMessage(`Please provide a valid ${path}`);
  }
  isStringOptionalNotEmpty(path: any) {
    return body(path)
      .isString()
      .optional()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is incorrect type`
      )
      .trim()
      .notEmpty()
      .withMessage(`${path} is empty`);
  }
  isBoolean(path: any) {
    return body(path)
      .exists()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is required`
      )
      .isBoolean()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is incorrect type`
      );
  }
  requiredObjectIdOptional(path: any, optional = false) {
    const isValid: CustomValidator = (value) => {
      if (!value || value === undefined || value.trim() === null) {
        return body(path)
          .optional()
          .withMessage(`Please provide a valid ${path}`);
      }

      return ObjectId.isValid(value);
    };
    return body(path)
      .custom(isValid)
      .withMessage(`Please provide a valid ${path}`);
  }

  requiredArray(path: any) {
    return body(path)
      .exists({
        checkNull: true,
      })
      .withMessage(`${path} is required`)
      .isArray()
      .withMessage(`${path} must be an array`);
  }

  isBooleanOptional(path: any) {
    return body(path)
      .isBoolean()
      .optional()
      .withMessage(
        `${path.split(".")[1] ? path.split(".")[1] : path} is incorrect type`
      );
  }

  isValid(path: any, payload: any): any {
    return check(path)
      .isIn(payload)
      .withMessage(
        `${
          path.split(".")[1] ? path.split(".")[1] : path
        } accept only ${payload}`
      );
  }
}
