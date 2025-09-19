// Import user model
import User from '../../model/user.model';
import bcrypt from 'bcryptjs';
const registerService = async (container:any) => {
   try {

    const { username, password, role } = container.input.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        const err:any = new Error('Username already exists');
        err.statusCode = 400;
        throw err;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
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