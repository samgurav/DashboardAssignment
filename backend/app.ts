import morgan from "morgan";
require("dotenv").config();
import mongoose from "mongoose";
import express from "express";
const cors = require("cors");
// import cors from "cors";
const db = "mongodb://localhost:27017/CampusAssessment";

const app = express();
import indexRoute from "./routes/index";
import bodyParser from "body-parser";
async function connect() {
  try {
    await mongoose.connect(db);
    console.log("Connected to DB");
  } catch (error) {
    console.error("connection error", error);
  }
}
connect();
app.use(cors());
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./"));

// app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    return res.status(200).json({});
  }
  next();
});
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("working..");
});

app.use("/api", indexRoute);

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
