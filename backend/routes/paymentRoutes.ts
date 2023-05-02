import express from "express";
const Razorpay = require("razorpay");
const Crypto = require("crypto");
const router = express.Router();
import { couseDetailsSchema } from "../models/CourseSchema";

router.post("/paymentcourse", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.SECRETID,
      key_secret: process.env.SECRETKEY,
    });

    const options = {
      amount: req.body?.values?.fees * 100,
      currency: "INR",
      receipt: Crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, async (error: any, order: any) => {
      if (error) {
        return res.status(500).json({ message: "Something Went Wrong!" });
      }

      const data = await couseDetailsSchema.updateOne(
        { _id: req.body.values._id },
        {
          $push: {
            registeredStudents: {
              userID: req.body.id,
            },
          },
        },
        { new: true }
      );
      if (data.modifiedCount === 1) {
        res.status(200).json({ data: order, message: "Payment done" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = Crypto.createHmac("sha256", process.env.SECRETKEY)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      let result: any = {
        status: true,
        data: [],
        message: "",
      };
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

export default router;
