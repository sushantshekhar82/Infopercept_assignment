'use strict';


class ResponseHelper {
      
    //
    // Success Format the response
    //
    async successResponse (data:any)  {

        let responseFormat : any = {
            status: 'success',
            data: data.result
        };

        if('meta' in data) {

            responseFormat.meta = data.meta;

        }

        if('message' in data) {

            responseFormat.message = data.message;

        }

        return responseFormat

    }

    //
    // Format Validation error response
    //
    async validationErrorResponse(data:any) {
        
        if(data){

            let validationErrorFormat : any = {
                status: 'error',
            };
    
            if ('validationErrors' in data) {
    
                validationErrorFormat.errors = data.validationErrors;
    
            }
    
            if('message' in data) {
    
                validationErrorFormat.message = data.message;
    
            }
            
            return validationErrorFormat

        }

    }


    async getStatusCode(error:any) {
                
        return !error || isNaN(error.statusCode) ? 500 : error.statusCode;

    }


    async getValidationError(errors:any) {

        try {

            const errFormat:any = new Error('validation_error');
            errFormat.validationErrors = errors;
            errFormat.statusCode = 400
            throw errFormat;

        } catch (err) {

            throw err;

        }
        

    }

}

export default new ResponseHelper()
