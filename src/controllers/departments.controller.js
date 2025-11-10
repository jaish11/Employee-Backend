const Department = require("../models/Department");
const Employee = require("../models/Employee");

exports.list = async (req, res, next) => {
  try {
    const deps = await Department.find().sort({ name: 1 });
    // Add counts
    const withCounts = await Promise.all(
      deps.map(async (d) => {
        const count = await Employee.countDocuments({ department: d.name });
        return {
          _id: d._id,
          name: d.name,
          description: d.description,
          employeeCount: count,
        };
      })
    );
    res.json(withCounts);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const d = new Department(req.body);
    await d.save();
    res.status(201).json(d);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const d = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!d) return res.status(404).json({ message: "Department not found" });
    res.json(d);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const d = await Department.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ message: "Department not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
