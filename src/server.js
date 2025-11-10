require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGO_URI);

// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin: "*" })); // production: restrict origin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static uploads
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "uploads"));

// routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/employees", require("./routes/employees.routes"));
app.use("/api/applicants", require("./routes/applicants.routes"));
app.use("/api/departments", require("./routes/departments.routes"));
app.use("/api/documents", require("./routes/documents.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

// default
app.get("/", (req, res) => res.json({ message: "EMS API is running" }));

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
