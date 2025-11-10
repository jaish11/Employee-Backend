const express = require("express");
const path = require("path");
const router = express.Router();
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

router.get("/download/:filename", (req, res) => {
  const filePath = path.join(process.cwd(), UPLOAD_DIR, req.params.filename);
  res.download(filePath);
});

module.exports = router;
