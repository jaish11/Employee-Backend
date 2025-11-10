const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/applicants.controller");
const upload = require("../middlewares/upload");

router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", upload.single("resume"), async (req, res, next) => {
  try {
    const body = req.body;
    if (req.file)
      body.resume = {
        filename: req.file.filename,
        originalname: req.file.originalname,
      };
    const Applicant = require("../models/Applicant");
    const app = new Applicant(body);
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
});
router.put("/:id/status", ctrl.updateStatus);

module.exports = router;
