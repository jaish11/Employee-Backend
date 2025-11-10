const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

// const signupController = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.send(error(400, "All fields are required"));
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.send(error(409, "User already exists. Please login."));
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     return res.send(success(201, { user }));
//   } catch (err) {
//     console.error(err);
//     res.send(error(500, "Internal server error"));
//   }
// };

const signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send(error(409, "User already exists. Please login."));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "HR", // Assign role, default is HR
    });

    return res.send(success(201, { user }));
  } catch (err) {
    console.error(err);
    res.send(error(500, "Internal server error"));
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send(error(404, "User not registered. Please signup."));
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.send(error(403, "Incorrect password"));
    }

    // const accessToken = generateAccessToken({ _id: user._id });
    // const refreshToken = generateRefreshToken({ _id: user._id });
    const accessToken = generateAccessToken({ _id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({
      _id: user._id,
      role: user.role,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: false, // ❗ set true only in production (HTTPS)
      sameSite: "lax",
    });

    return res.send(success(200, { accessToken }));
  } catch (err) {
    console.error(err);
    res.send(error(500, "Internal server error"));
  }
};

const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.send(error(401, "Refresh token missing in cookies"));
  }

  try {
    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
    const accessToken = generateAccessToken({ _id: decoded._id });
    return res.send(success(200, { accessToken }));
  } catch (err) {
    return res.send(error(401, "Invalid refresh token"));
  }
};

// Internal token functions
const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_KEY, { expiresIn: "10d" });
};

const generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_KEY, { expiresIn: "1y" });
};

module.exports = {
  signupController,
  loginController,
  refreshAccessTokenController,
};
