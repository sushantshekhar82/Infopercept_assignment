// Import user model
import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
import User from '../../model/user.model';
import bcrypt from 'bcryptjs';
import DynamicDatabase from '../../model/dynamicDatabase.model'
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
const createDynamicDatabaseService = async (container:any) => {
   try {

     const { email } = container.input.body;

     console.log(email)
    if (!email) {
        const err:any = new Error('Email required');
        err.statusCode = 400;
        throw err;
    }

    const dbName = getDbNameFromEmail(email);
    
console.log("dbname",dbName)
    // check if tenant exists in main DB
    const existing = await DynamicDatabase.findOne({ email });
    console.log("existing",existing)
    if (existing) {
        const err:any = new Error('Database Already Exist');
        err.statusCode = 400;
        throw err;
    }

    // store tenant info in main DB
    await DynamicDatabase.create({ email, dbName });

    // create connection to tenant DB and default collections
    const conn = getDynamicConnection(dbName);
    console.log("conn")
    const { User } = getDynamicDatabaseModels(conn);

    //await User.create({ email, password: "default@123",role: 'admin' }); // optional initial user

    container.output.result = {
        message: `Tenant created with DB: ${dbName}`
    }
  } catch (error) {
    throw error;
  }
}

export default createDynamicDatabaseService;