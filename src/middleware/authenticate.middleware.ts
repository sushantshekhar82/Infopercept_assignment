import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../model/user.model";
import config from '../config/contant';
import getDbNameFromEmail from "../helpers/getDatabasebyEmail.helper";
import getDynamicConnection from "../helpers/checkDynamicDatabase.helper";
import { getDynamicDatabaseModels } from "../model/getDynamicModel";
interface AuthRequest extends Request {
  loggedInUser?: {
    userId: string;
    role: string;
    email: string;
  };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    console.log("enter in middleware")
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("get token",token)
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const publicKey = `-----BEGIN PUBLIC KEY-----\n${config.app.KEYCLOK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;

    const decodedToken:any = jwt.verify(
      token,
     publicKey as string,{
        algorithms: ["RS256"]
      }
    )
    // as JwtPayload & { userId: string };
console.log("decodedToken",decodedToken)
    const userEmail:any = decodedToken.email;
    const dbName = getDbNameFromEmail(userEmail); // dynamic DB name
    const conn = getDynamicConnection(dbName);     // dynamic connection
    const { User } = getDynamicDatabaseModels(conn);

    let user:any = await User.findOne({email: userEmail});
    if (!user) {
       const newUser = new User({
        email: userEmail
      });

      await newUser.save();
    }
    user = await User.findOne({email: userEmail});

    if (user.role !== "user" && user.role !== "admin") {
      return res.status(403).json({ message: "Invalid user role" });
    }

    // attach loggedInUser to request
    req.loggedInUser = {
      userId: user._id.toString(),
      role: user.role,
      email: user.email
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
