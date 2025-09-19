import { NextFunction, Request, Response } from "express-serve-static-core";
import responseHelper from "../../helpers/response.helper";
import userverificationService from "../services/userVerification.service";
import userverificationListService from "../services/listUserVerification.service";
import userverificationDetailsService from "../services/getUserVerificationDetails.service";
class UserVerificationController {

    async userVerification(req:any,res:Response,next:NextFunction){

        try {

             const container = {
            input :{
                body: req.body,
                file: req.file,
                loggedInUser: req.loggedInUser
            },
             output:{
                    result:{}
            }
        }

            await userverificationService(container);
    
            //
            // send the response
            //
            res.status(200).json(await responseHelper.successResponse(container.output));

            
        } catch (error) {
             res.status(await responseHelper.getStatusCode(error))
            .json(await responseHelper.validationErrorResponse(error));
        }
       
    }

     async listVerifications(req: any, res: Response, next: NextFunction) {
        try {
            const container = {
                input: { query: req.query,loggedInUser: req.loggedInUser},
                output: { result: {} },
            };

            await userverificationListService(container);
            res
                .status(200)
                .json(await responseHelper.successResponse(container.output));
        } catch (error) {
            res
                .status(await responseHelper.getStatusCode(error))
                .json(await responseHelper.validationErrorResponse(error));
            }
  }

   async detailsVerifications(req: Request, res: Response, next: NextFunction) {
        try {
            const container = {
                input: { query: req.query,params: req.params },
                output: { result: {} },
            };

            await userverificationDetailsService(container);

            res
                .status(200)
                .json(await responseHelper.successResponse(container.output));
        } catch (error) {
            res
                .status(await responseHelper.getStatusCode(error))
                .json(await responseHelper.validationErrorResponse(error));
            }
  }

}

export default new UserVerificationController()