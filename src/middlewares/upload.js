const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  //   filename: (req, file, cb) => {
  //     const ext = path.extname(file.originalname);
  //     cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  //   },
});

const upload = multer({ storage });

module.exports = upload;
