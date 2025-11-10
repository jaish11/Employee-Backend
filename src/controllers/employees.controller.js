const Employee = require("../models/Employee");

exports.list = async (req, res, next) => {
  try {
    // Basic filtering: department & role & search by name
    const { department, role, search, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (role) filter.role = role;
    if (search) filter.name = { $regex: search, $options: "i" };

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Employee.find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Employee.countDocuments(filter),
    ]);

    res.json({
      data: items,
      meta: { total, page: parseInt(page), limit: parseInt(limit) },
    });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const emp = new Employee(body);
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// Add document to employee
exports.uploadDocument = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    const file = req.file;
    emp.documents = emp.documents || [];
    emp.documents.push({
      filename: file.filename,
      originalname: file.originalname,
      uploadedAt: new Date(),
    });
    await emp.save();
    res.json({ message: "Uploaded", document: file });
  } catch (err) {
    next(err);
  }
};
