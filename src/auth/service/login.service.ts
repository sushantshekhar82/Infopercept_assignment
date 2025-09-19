 import User from '../../model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import config from '../../config/contant';
const loginSerivce = async (container:any) => {

    try {

         const { username, password } = container.input.body;
    
        // Find the user by username
        const user = await User.findOne({ username });
        
        if (!user) {
            
            const err:any = new Error('Invalid username or password,Please Register first');
            err.statusCode = 400;
            throw err;
        }
        const userid=user._id
        const uniqueuser=user.username;
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
        const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);

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
   