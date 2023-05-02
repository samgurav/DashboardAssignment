import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

let userDetails = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
  },

  password: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
  },
});

const userDetailsSchema = mongoose.model("userDetail", userDetails);

export { userDetailsSchema };
