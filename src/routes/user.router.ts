import { Router } from "express";
import userController from "../controllers/user.controller";
import endpointAuth from "../middlewares/endpointAuth";
import fileUploader from "../utils/fileUploader";

const usersRouter: Router = Router();

const uploadFields = fileUploader.fields([
  { name: "profileImage", maxCount: 10 },
  { name: "productImage", maxCount: 10 },
  { name: "document", maxCount: 10 },
]);

/** POST ENPOINTS */
usersRouter.post(
  "/:uid/documents",
  uploadFields,
  userController.uploadDocumentsById
);

/** PUT ENPOINTS */
usersRouter.put(
  "/premium/:uid",
  endpointAuth(["admin"]),
  userController.updateUserRolById
);
usersRouter.put("/reset-password", userController.resetPasswordUser);
usersRouter.put("/create-new-password", userController.createNewPasswordUser);

export default usersRouter;
