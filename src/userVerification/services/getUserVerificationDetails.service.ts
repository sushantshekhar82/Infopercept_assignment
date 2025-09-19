import UserVerification from "../../model/userVerification.model";

 const userverificationDetailsService = async (container: any) => {
    const { params } = container.input;

    const verificationDetails = await UserVerification.findById(params.id);

    container.output.result = {
      verificationDetails
    };
  }
export default userverificationDetailsService;
