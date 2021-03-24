import { v4 as uuid } from "uuid";
import TokenAuthenticator from "../helpers//TokenAuthenticator";
import Response from "../helpers/Response";
import httpStatus from "http-status";
import AuthService from "../services/AuthService";
import passwordGenerator from 'generate-password';

class AuthController {

  static async signup(req, res) {
    const newUser = await AuthService.userSignup(req);
    const { password, ...data } = newUser.dataValues;
    const token = TokenAuthenticator.tokenGenerator(data);
    data.token = token;

    Response.successMessage(
      res,
      "Account created successfully!",
      { token },
      httpStatus.CREATED
    );
  }

  static async login(req, res) {
    const { result } = req;

    const { password: pwd, ...data } = result.dataValues;
    const token = TokenAuthenticator.signToken(data);
    return Response.successMessage(
      res,
      "Logged in successfully",
      { token },
      httpStatus.OK
    );
  }

  static async assignRole(req, res) {
    await AuthService.assignRole(req);
    return Response.successMessage(
      res,
      "Role assigned successfully",
      '',
      httpStatus.OK
    );
  }

  static async inviteUser(req, res) {
    const newPassword = passwordGenerator.generate({length: 10, uppercase: true, lowercase:true, numbers: true, symbols: true})
    req.body.password = newPassword;
    const newUser = await AuthService.inviteUser(req);
    const { password, ...data } = newUser.dataValues;
    const token = TokenAuthenticator.tokenGenerator(data);
    data.token = token;
    
    return Response.successMessage(
      res,
      "Invitation has been sent successfully!",
      data,
      httpStatus.CREATED
    );
  }

  static async viewUsers(req, res) {

    const users = await AuthService.viewUsers(req);

    return Response.successMessage(
      res,
      "Invitation has been sent successfully!",
      users,
      httpStatus.CREATED
    );
  }

  static async updateProfile(req, res) {
    const profileData = await AuthService.updateProfile(req);
    return Response.successMessage(
      res,
      "Profile updated successfully",
      profileData,
      httpStatus.OK
    );
  }

}
export default AuthController;
