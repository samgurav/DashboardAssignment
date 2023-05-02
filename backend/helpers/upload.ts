const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var storage = Multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "./Images/");
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + file.originalname);
  },
});

let processFile = Multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
}).single("photo");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
