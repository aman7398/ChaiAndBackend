// require("dotenv").config({ path: "../.env" });
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

connectDB();
// import express from "express";

// const app = express();
// async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//     app.on(error, (error) => {
//       console.log("ERROR", error);
//       throw error;
//     });
//     app.listen(`process.env.PORT`, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("ERROR", error);
//     throw error;
//   }
// };
// first aproach for connect database
