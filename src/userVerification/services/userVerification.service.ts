import getDynamicConnection from '../../helpers/checkDynamicDatabase.helper';
import getDbNameFromEmail from '../../helpers/getDatabasebyEmail.helper';
import { getDynamicDatabaseModels } from '../../model/getDynamicModel';
import UserVerification from '../../model/userVerification.model';
import config from '../../config/contant';
import FormData from 'form-data';
import axios from 'axios';

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

        // Call Surepass OCR API
        let ocrData = null;
        let ocrMessage = "OCR processing completed";
        
        try {
            
            const bodyDetails ={
                id_number: documentId
            }
            const surepassResponse = await axios.post(
                'https://kyc-api.surepass.app/api/v1/voter-id/voter-id',
                bodyDetails,
                {
                    headers: {
                        
                        'Authorization': `Bearer ${config.app.SUREPASS_API_TOKEN}`
                    },
                    timeout: 300000 // 30 seconds timeout
                }
            );
console.log("surepassresponse",surepassResponse)
            if (surepassResponse.data && surepassResponse.data.success) {
                ocrData = surepassResponse.data.data;
                ocrMessage = "OCR data extracted successfully";
            } else {
                ocrMessage = "OCR API returned unsuccessful response";
            }
        } catch (ocrError: any) {
            console.error('Surepass OCR API Error:', ocrError.response?.data || ocrError.message);
            ocrMessage = `OCR processing failed: ${ocrError.response?.data?.message || ocrError.message}`;
        }

         const dbName = getDbNameFromEmail(loggedInUser.email); // dynamic DB name
         const conn = getDynamicConnection(dbName);     // dynamic connection
         const { UserVerification } = getDynamicDatabaseModels(conn);

        // Prepare document data with OCR results
        const documentData: any = {
            fileName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            base64: base64Data,
            ocrMessage: ocrMessage
        };

        // Add OCR data if available
        if (ocrData) {
            documentData.ocrData = ocrData;
        }

        // save or update record
        const verification = await UserVerification.findOneAndUpdate(
            { userId, documentId },
            {
                userId,
                documentId,
                documentData,
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
