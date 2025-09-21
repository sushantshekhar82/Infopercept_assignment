import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';

const updateUserVerificationStatusService = async (container: any) => {
    try {
        const { body, params, loggedInUser } = container.input;
        const { verificationId } = params;
        const { verificationStatus } = body;
console.log("loggedInUser+++++",loggedInUser)
        // Validate required fields
        if (!verificationId) {
            throw new Error("Verification ID is required");
        }

        if (!verificationStatus) {
            throw new Error("Verification status is required");
        }

        // Validate status value
        const validStatuses = ['pending', 'verified', 'rejected'];
        if (!validStatuses.includes(verificationStatus)) {
            throw new Error("Invalid verification status. Must be one of: pending, verified, rejected");
        }
console.log("wwwwwwwwww",verificationStatus)
        const dbName = getDbNameFromEmail(loggedInUser.email); // dynamic DB name
        const conn = getDynamicConnection(dbName);     // dynamic connection
        const { UserVerification } = getDynamicDatabaseModels(conn);

        // Find and update the verification record
        const updatedVerification = await UserVerification.findByIdAndUpdate(
            verificationId,
            { 
                verificationStatus,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedVerification) {
            throw new Error("User verification record not found");
        }

        container.output.result = updatedVerification;
    } catch (error) {
        throw error;
    }
};

export default updateUserVerificationStatusService;
