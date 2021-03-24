import { v4 as uuid } from "uuid";
import { users } from "../db/models";
import Queries from "./Queries";
import HashPassword from "../helpers/HashPassword";
import TokenAuthenticator from "../helpers/TokenAuthenticator";

class AuthService {
  /**
   * User new account creation method
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async userSignup(req) {
    const { firstName, lastName, email, password, institutution, phone } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const newUserObject = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      institutution,
      role: 3, // default role is 3 : user
      isVerified: true,
      isActive: true,
    };
    const newUser = await Queries.create(users, newUserObject);
    return newUser;
  }

  /**
   * Admin assign roles
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async assignRole(req) {
    const { userId, role } = req.body;
    const updateRoleObj = [{ role }, { where: { id: userId } }];
    const newUser = await Queries.update(users, updateRoleObj);
    return newUser;
  }

  /**
   * Admin add other admins
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async inviteUser(req) {
    const { email, firstName, lastName, password, role } = req.body;
    const hashedPassword = HashPassword.hashPassword(password);
    const newUserObject = {
      id: uuid(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      is_verified: true,
      is_active: true,
    };
    const newUser = await Queries.create(users, newUserObject);
    return newUser;
  }

  /**
   * Admin view users
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async viewUsers(req) {
    const allUsers = await Queries.findAll(users, {
      exclude: ["password"],
    });
    return allUsers;
  }

  /**
   * User update profile
   * @static
   * @param {object} req  request object
   * @memberof AuthService
   * @returns {object} data
   */
  static async updateProfile(req) {
    const { firstName, lastName, email, password } = req.body;
    const { id } = req.user;
    let userProfile;
    if (password) {
      const hashedPassword = HashPassword.hashPassword(password);
      const updateProfileObj = [
        { password: hashedPassword },
        { where: { id }, plain: true, returning: true },
      ];
      userProfile = await Queries.update(users, updateProfileObj);
    } else {
      const updateProfileObj = [
        { firstName, lastName, email },
        { where: { id }, plain: true, returning: true },
      ];
      userProfile = await Queries.update(users, updateProfileObj);
    }
    const { password: newPassword, ...userData } = userProfile[1].dataValues;
    const token = TokenAuthenticator.tokenGenerator(userData);

    return token;
  }
}
export default AuthService;
