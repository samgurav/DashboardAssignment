import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;

let lessonDetails = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  doubts: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetail",
      },
      courseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "couseDetails",
      },
      doubt: {
        type: String,
      },
      question: {
        type: String,
      },
      ID: {
        type: String,
      },
      answer: {
        type: String,
      },
    },
  ],

  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "couseDetails",
  },
});

const lessonDetailsSchema = mongoose.model("lessonDetails", lessonDetails);

export { lessonDetailsSchema };
