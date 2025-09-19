import dotenv from 'dotenv';
dotenv.config();

export default{
    app:{
        PORT: process.env.PORT,
        SECRETKEY: process.env.SECRETKEY,
        MONGODBURL: process.env.MONGODBURL
    }
}