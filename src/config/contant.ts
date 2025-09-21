import dotenv from 'dotenv';
dotenv.config();

export default{
    app:{
        PORT: process.env.PORT,
        SECRETKEY: process.env.SECRETKEY,
        MONGODBURL: process.env.MONGODBURL,
        MONGO_USERNAME: process.env.MONGO_USERNAME,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        MONGO_CLUSTER: process.env.MONGO_CLUSTER,
        KEYCLOK_PUBLIC_KEY: process.env.KEYCLOK_PUBLIC_KEY,
        SUREPASS_API_TOKEN: process.env.SUREPASS_API_TOKEN
    }
}