import getDynamicConnection from "../../helpers/checkDynamicDatabase.helper";
import getDbNameFromEmail from "../../helpers/getDatabasebyEmail.helper";
import { getDynamicDatabaseModels } from "../../model/getDynamicModel";
import UserVerification from "../../model/userVerification.model";

 const userverificationDetailsService = async (container: any) => {
    const { params } = container.input;
    const {loggedInUser} = container.input.body;
    const { email } = loggedInUser;
    const dbName = getDbNameFromEmail(email); // dynamic DB name
    const conn = getDynamicConnection(dbName);     // dynamic connection
    const { UserVerification } = getDynamicDatabaseModels(conn);

    const verificationDetails = await UserVerification.findById(params.id);

    container.output.result = {
      verificationDetails
    };
  }
export default userverificationDetailsService;
