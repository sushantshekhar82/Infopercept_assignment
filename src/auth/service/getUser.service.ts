import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';

const getUserService = async (container: any) => {
    try {
        const { loggedInUser } = container.input;

        if (!loggedInUser || !loggedInUser.userId) {
            throw new Error("User not authenticated");
        }

        const dbName = getDbNameFromEmail(loggedInUser.email); // dynamic DB name
        const conn = getDynamicConnection(dbName);     // dynamic connection
        const { User } = getDynamicDatabaseModels(conn);

        // Find user by ID
        const user = await User.findById(loggedInUser.userId).select('_id username role createdAt updatedAt');

        if (!user) {
            throw new Error("User not found");
        }

        container.output.result = {
            userId: user._id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    } catch (error) {
        throw error;
    }
};

export default getUserService;
