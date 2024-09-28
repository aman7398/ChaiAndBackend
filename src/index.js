// require("dotenv").config({ path: "../.env" });
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ path: "../.env" });
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port 8000: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
    // mongoose.connection.close();
  });
