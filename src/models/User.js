// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["SuperAdmin", "HR"],
    default: "HR", // Most users are HR by default
  },
});

module.exports = mongoose.model("User", userSchema);
