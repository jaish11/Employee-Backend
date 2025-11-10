const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    appliedRole: { type: String, required: true },
    appliedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["new", "shortlisted", "rejected", "hired"],
      default: "new",
    },
    resume: { filename: String, originalname: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", ApplicantSchema);
