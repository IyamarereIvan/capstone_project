import express from "express";
import Validator from "../../middlewares/Validator";
import { accountExist } from "../../middlewares/scodeChecker";
import AuthController from "../../controllers/AuthController";
import DataChecker from "../../middlewares/DataChecker";
import verifyToken from "../../middlewares/verifyToken";
import verifyAccess from "../../middlewares/verifyAccess";
import { userExists } from "../../middlewares/scodeChecker";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  Validator.newAccountRules(),
  Validator.validateInput,
  accountExist,
  AuthController.signup
);

authRouter.post(
  "/login",
  Validator.loginRules(),
  Validator.validateInput,
  DataChecker.validateCredentials,
  AuthController.login
);



export default authRouter;
