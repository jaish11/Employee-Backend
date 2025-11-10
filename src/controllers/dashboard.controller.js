const Employee = require("../models/Employee");
const Applicant = require("../models/Applicant");
const Department = require("../models/Department");

exports.getSummary = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalApplicants = await Applicant.countDocuments();
    const departmentCount = await Department.countDocuments();

    // Assuming 'role' field exists in Employee model
    const activeJobRoles = await Employee.distinct("role");

    res.json({
      totalEmployees,
      totalApplicants,
      departmentCount,
      activeJobRoles: activeJobRoles.length,
    });
  } catch (err) {
    next(err);
  }
};
