const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employees.controller");
const upload = require("../middlewares/upload");

router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

// upload document for employee
router.post("/:id/documents", upload.single("file"), ctrl.uploadDocument);

module.exports = router;
