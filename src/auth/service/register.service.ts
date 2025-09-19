// Import user model
import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';
import bcrypt from 'bcryptjs';
const registerService = async (container:any) => {
   try {

    const { email, password, role } = container.input.body;

      const dbName = getDbNameFromEmail(email); // dynamic DB name
      const conn = getDynamicConnection(dbName);     // dynamic connection
      const { User } = getDynamicDatabaseModels(conn);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const err:any = new Error('email already exists');
        err.statusCode = 400;
        throw err;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    container.output.result = {
        message: 'User registered successfully'
    }
  } catch (error) {
    throw error;
  }
}

export default registerService;