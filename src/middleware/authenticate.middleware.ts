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
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decodedToken = jwt.verify(
      token,
      config.app.SECRETKEY as string
    ) as JwtPayload & { userId: string };

    const dbName = getDbNameFromEmail(decodedToken.email); // dynamic DB name
    const conn = getDynamicConnection(dbName);     // dynamic connection
    const { User } = getDynamicDatabaseModels(conn);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

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
