import { NextFunction, Request, Response } from "express-serve-static-core";
import registerService from "./register.service";
import responseHelper from "../helpers/response.helper";
import loginSerivce from "./login.service";

class AuthController {

    async register(req:Request,res:Response,next:NextFunction){

        try {

             const container = {
            input :{
                body: req.body
            },
             output:{
                    result:{}
            }
        }
    
            await registerService(container);
    
            //
            // send the response
            //
            res.status(200).json(await responseHelper.successResponse(container.output));

            
        } catch (error) {
             res.status(await responseHelper.getStatusCode(error))
            .json(await responseHelper.validationErrorResponse(error));
        }
       
    }

     async login(req:Request,res:Response,next:NextFunction){
         try {

            const container = {
                input :{
                    body: req.body
                },
                output:{
                        result:{}
                }
            }

            await loginSerivce(container);

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

export default new AuthController()