const Applicant = require("../models/Applicant");

exports.list = async (req, res, next) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role) filter.appliedRole = role;
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Applicant.find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({ appliedDate: -1 }),
      Applicant.countDocuments(filter),
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
    const app = await Applicant.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Applicant not found" });
    res.json(app);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    const app = new Applicant(body);
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const app = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!app) return res.status(404).json({ message: "Applicant not found" });
    res.json(app);
  } catch (err) {
    next(err);
  }
};
