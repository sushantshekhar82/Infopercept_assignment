import { NextFunction, Request, Response } from "express-serve-static-core";
import responseHelper from "../../helpers/response.helper";
import createDynamicDatabaseService from "../service/createDatabaseService";

class DynamicDatabaseController {

    async createDynamicDatabase(req:Request,res:Response,next:NextFunction){

        try {

             const container = {
            input :{
                body: req.body
            },
             output:{
                    result:{}
            }
        }
    console.log("ccccccccccc",container)
            await createDynamicDatabaseService(container);
    
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

export default new DynamicDatabaseController()