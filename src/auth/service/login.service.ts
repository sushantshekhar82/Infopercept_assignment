 import User from '../../model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import config from '../../config/contant';
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
const loginSerivce = async (container:any) => {

    try {

         const { email, password } = container.input.body;

         const dbName = getDbNameFromEmail(email); // dynamic DB name
        const conn = getDynamicConnection(dbName);     // dynamic connection
        const { User } = getDynamicDatabaseModels(conn);
    
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            
            const err:any = new Error('Invalid email or password,Please Register first');
            err.statusCode = 400;
            throw err;
        }
        const userid=user._id
        const uniqueuser=user.email;
        const role=user.role;
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {

            const err:any = new Error('Wrong password');
            err.statusCode = 400;
            throw err;
        }

        const secretKey:any = config.app.SECRETKEY;
    
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, secretKey);

        container.output.result = {
            userId: userid,
            uniqueuser: uniqueuser,
            role: role,
            token: token

        }

    } catch (error) {
        throw error;
    }
}
export default loginSerivce;
   