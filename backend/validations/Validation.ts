import { Validation } from "../helpers/validation";

const ValidationRule = new Validation();

export class UserValidation {
  login() {
    return [
      ValidationRule.isString("email"),
      ValidationRule.isString("password"),
    ];
  }
  updateuser() {
    return [
      ValidationRule.isString("name"),
      ValidationRule.isString("username"),
      ValidationRule.requiredObjectId("id"),
    ];
  }
  addcourse() {
    return [ValidationRule.isString("title")];
  }
}
