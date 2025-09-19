import config from './config/contant';
import express from 'express';
const app = express();
const port = config.app.PORT
import auth from './auth/auth.route'
import verification from './userVerification/userVerification.route'
import mongoose from 'mongoose';
app.use(express.json())

app.use("/auth", auth);
app.use('/verification',verification)

const MONGODBURL:any = config.app.MONGODBURL
app.listen(port, function () {
  mongoose.connect(MONGODBURL)
  return console.log(`Server is running on ${port}`);
});