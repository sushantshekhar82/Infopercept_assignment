import config from './config/contant';
import express from 'express';
const app = express();
import auth from '../src/auth/route/auth.route'
import verification from './userVerification/route/userVerification.route'
import dynamicDatabase from './createDynamicDatabase/route/createDynamicDatabase.route'
import mongoose from 'mongoose';
import cors from 'cors';
app.use(cors()); 
app.use(express.json())
console.log("here123")
app.get("/ping", (req, res) => {
  console.log("PING hit");
  res.send("Hello World!");
});
app.use("/database-create",dynamicDatabase)
app.use("/auth", auth);
app.use('/verification',verification)
const port: number = Number(config.app.PORT) || 5050;
const MONGODBURL:any = config.app.MONGODBURL
mongoose.connect(MONGODBURL)
  .then(() => {
    console.log("Database connected");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch(err => console.error("DB connection error:", err));

