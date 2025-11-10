const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/employees.controller");
const upload = require("../middlewares/upload");
const requireAuth = require("../middlewares/requireAuth");
const requireRole = require("../middlewares/requireRole");

router.use(requireAuth);
router.get("/", ctrl.list);
router.get("/:id", ctrl.get);
router.post("/", requireRole(["SuperAdmin", "HR"]), ctrl.create);
router.put("/:id", requireRole(["SuperAdmin", "HR"]), ctrl.update);
router.delete("/:id", requireRole(["SuperAdmin"]), ctrl.remove);

// upload document for employee
router.post(
  "/:id/documents",
  requireRole(["SuperAdmin", "HR"]),
  upload.single("file"),
  ctrl.uploadDocument
);

module.exports = router;
