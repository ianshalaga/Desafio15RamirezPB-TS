import { Request, Response } from "express";
import { mailService, userService } from "../services/services";
import { successStatus, failureStatus } from "../utils/statuses";
import { DbUser } from "../interfaces/user.interface";
import { password } from "../utils/mailing";
import { createHash, isValidPassword } from "../utils/passwordHashing";
import { generatePasswordResetToken } from "../utils/resetToken";
import config from "../config/env.config";

class UserController {
  constructor() {}

  // @@@@
  async updateUserRolById(req: Request, res: Response) {
    try {
      const uid: string = req.params.uid;
      const dbUser: DbUser = await userService.getUserById(uid);
      let rol = "";
      if (dbUser.rol === "user") {
        rol = "premium";
      }
      if (dbUser.rol === "premium") {
        rol = "user";
      }
      await userService.updateUserRolById(uid, rol);
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async resetPasswordUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { token, expires } = generatePasswordResetToken();
      await userService.updateUserTokenByEmail(email, token, expires);
      await mailService.googleMailService(
        email,
        password.subject,
        `<a href="http://localhost:${config.port}/create-new-password?token=${token}"><button>Recuperar contraseña</button></a>`
      );
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  // @@@@
  async createNewPasswordUser(req: Request, res: Response) {
    try {
      const { password } = req.body;
      const token: string = req.query.token as string;
      const dbUser: DbUser = await userService.getUserByToken(token);
      if (!dbUser || dbUser.resetTokenExpires < Date.now()) {
        // req.logger.error("Token is invalid or has expired.");
        // return res
        //   .status(400)
        //   .json({ message: "Token is invalid or has expired." });
        res.render("resetPassword", {
          title: "Reset Password",
          style: "app.css",
        });
      }
      if (isValidPassword(dbUser, password)) {
        req.logger.error("You can't use the same password than before.");
        return res
          .status(400)
          .json({ message: "You can't use the same password than before." });
      }
      await userService.updateUserPasswordByToken(token, createHash(password));
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }

  async uploadDocumentsById(req: Request, res: Response) {
    try {
      const uid: string = req.params.uid;
      const files = req.files;
      console.log(files);
      console.log(uid);
      console.log("HOLIS");
      res.status(200).json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
}

export default new UserController();
