import { Router } from "express";
import userController from "../controllers/user.controller";
import endpointAuth from "../middlewares/endpointAuth";
import fileUploader from "../utils/fileUploader";

const usersRouter: Router = Router();

const uploadFields = fileUploader.fields([
  { name: "profiles", maxCount: 10 },
  { name: "products", maxCount: 10 },
  { name: "documents", maxCount: 10 },
]);

/** POST ENPOINTS */
usersRouter.post(
  "/:uid/documents",
  uploadFields,
  userController.uploadDocumentsByIdUser
);

/** PUT ENPOINTS */
usersRouter.put(
  "/premium/:uid",
  endpointAuth(["admin"]),
  userController.updateUserRolById
);
usersRouter.put("/reset-password", userController.resetPasswordUser);
usersRouter.put("/create-new-password", userController.createNewPasswordUser);

/** DELETE ENPOINTS */
usersRouter.delete("/:uid/documents", userController.deleteDocumentsByIdUser);

export default usersRouter;
