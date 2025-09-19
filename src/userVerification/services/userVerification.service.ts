import UserVerification from '../../model/userVerification.model';

const userverificationService = async (container: any) => {
    try {
        const { body, file, loggedInUser } = container.input;
        const { documentId } = body;
        const userId = loggedInUser.userId;

        if (!file) {
            throw new Error("Document file is required");
        }

        // convert file buffer to base64
        const base64Data = file.buffer.toString("base64");

        // save or update record
        const verification = await UserVerification.findOneAndUpdate(
            { userId, documentId },
            {
                userId,
                documentId,
                documentData: {
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                    base64: base64Data,
                },
                verificationStatus: "pending"
            },
            { new: true, upsert: true }
        );

        container.output.result = verification;
    } catch (error) {
        throw error;
    }
};

export default userverificationService;
