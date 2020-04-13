import multer from 'multer';
import {fileFilterHandler} from '../interfaces/MulterFileFilter'
import { v4 as uuidv4 } from 'uuid';

const path = process.cwd() + "/public/img/avatars";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
      cb(null, path);
  },
  filename: (_req, file, cb) => {
      cb(null, uuidv4().toString() + "_" + file.originalname);
  }
});


const fileFilter : fileFilterHandler = (_req, file, cb) : void => {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
  } else {
      cb(new Error("Type file is not access"));
  }
};

export default multer({
  storage,
  fileFilter,
  limits: {fileSize: 1024 * 1024 * 5} // 5 Мегабайт
}).single('avatar');

