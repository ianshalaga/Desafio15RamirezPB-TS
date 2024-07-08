import multer from "multer";
import { rootPath } from "./paths";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profileImage") {
      cb(null, rootPath + "/src/uploads/profiles");
    } else if (file.fieldname === "productImage") {
      cb(null, rootPath + "/src/uploads/products");
    } else if (file.fieldname === "document") {
      cb(null, rootPath + "/src/uploads/documents");
    } else {
      cb(null, rootPath + "/src/uploads/others");
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileUploader = multer({ storage });

export default fileUploader;
