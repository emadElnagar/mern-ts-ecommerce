import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (_req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname);
  },
});

export const upload = multer({ storage: storage });
