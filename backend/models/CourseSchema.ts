import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

let couseDetails = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  fees: {
    type: Number,
  },
  duration: {
    type: String,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDetail",
  },
  Assignments: {
    type: Array,
  },
  registeredStudents: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetail",
      },
    },
  ],
});

const couseDetailsSchema = mongoose.model("couseDetails", couseDetails);

export { couseDetailsSchema };
