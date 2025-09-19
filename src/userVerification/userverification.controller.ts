import { NextFunction, Request, Response } from "express-serve-static-core";
import responseHelper from "../helpers/response.helper";
import userverificationService from "./userVerification.service";
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

}

export default new UserVerificationController()