import multer from "multer";
import { extname, resolve } from "path";

const additional = Math.floor(Math.random() * 10000 + 10000);
export default {
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return cb(new multer.MulterError("Formato deve ser jpeg ou png."));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${additional}${extname(file.originalname)}`);
    },
  }),
};
