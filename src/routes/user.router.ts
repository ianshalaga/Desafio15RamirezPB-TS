import { Router } from "express";
import userController from "../controllers/user.controller";
import endpointAuth from "../middlewares/endpointAuth";

const usersRouter: Router = Router();

/** PUT ENPOINTS */
usersRouter.put(
  "/premium/:uid",
  endpointAuth(["admin"]),
  userController.updateUserRolById
);
usersRouter.put("/reset-password", userController.resetPasswordUser);
usersRouter.put("/create-new-password", userController.createNewPasswordUser);

export default usersRouter;
