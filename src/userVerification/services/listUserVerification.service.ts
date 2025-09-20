import getDynamicConnection from "../../helpers/checkDynamicDatabase.helper";
import getDbNameFromEmail from "../../helpers/getDatabasebyEmail.helper";
import { getDynamicDatabaseModels } from "../../model/getDynamicModel";
import UserVerification from "../../model/userVerification.model";

 const userverificationListService = async (container: any) => {
    const { query } = container.input;
    const { loggedInUser } = container.input;
console.log(loggedInUser)
    // if(loggedInUser.role !== "admin"){
    //     throw new Error("unauthorized,you are not admin");
    // }

      const dbName = getDbNameFromEmail(loggedInUser.email); // dynamic DB name
      const conn = getDynamicConnection(dbName);     // dynamic connection
      const { UserVerification } = getDynamicDatabaseModels(conn);

    // filters
    const filter: any = {};
    if (query.userId) filter.userId = query.userId;
    if (query.verificationStatus) filter.verificationStatus = query.verificationStatus;

    // pagination
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [verifications, total] = await Promise.all([
      UserVerification.find(filter)
        .select("-documentData.base64")
        .populate("userId", "username role") // populate user info
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      UserVerification.countDocuments(filter),
    ]);

    container.output.result = {
      docs: verifications,
      totalDocs: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }
export default userverificationListService;
