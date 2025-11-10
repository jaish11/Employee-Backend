require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Employee = require("../models/Employee");
const Applicant = require("../models/Applicant");
const Department = require("../models/Department");

const seed = async () => {
  await connectDB(process.env.MONGO_URI);
  // Clear
  await Employee.deleteMany({});
  await Applicant.deleteMany({});
  await Department.deleteMany({});

  const deps = await Department.insertMany([
    { name: "Engineering", description: "All dev teams" },
    { name: "QA", description: "Quality Assurance" },
    { name: "HR", description: "Human Resources" },
    { name: "Sales", description: "Sales & Marketing" },
  ]);

  const employees = [
    {
      name: "Alice Smith",
      email: "alice@example.com",
      role: "Frontend Dev",
      department: "Engineering",
      joiningDate: new Date("2023-01-10"),
    },
    {
      name: "Bob Lee",
      email: "bob@example.com",
      role: "Backend Dev",
      department: "Engineering",
      joiningDate: new Date("2022-09-15"),
    },
    {
      name: "Carol Jones",
      email: "carol@example.com",
      role: "QA Engineer",
      department: "QA",
      joiningDate: new Date("2024-06-01"),
    },
  ];
  await Employee.insertMany(employees);

  const applicants = [
    {
      name: "Dave Applicant",
      email: "dave@candidate.com",
      appliedRole: "Frontend Dev",
      status: "new",
    },
    {
      name: "Eve Candidate",
      email: "eve@candidate.com",
      appliedRole: "Backend Dev",
      status: "shortlisted",
    },
  ];
  await Applicant.insertMany(applicants);

  console.log("Seed data inserted");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
