const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    joiningDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "inactive", "on-leave"],
      default: "active",
    },
    documents: [{ filename: String, originalname: String, uploadedAt: Date }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
