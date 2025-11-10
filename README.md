# 🧑‍💼 EMS Backend — Employee & Recruitment Management System

Backend service for the **Employee & Recruitment Management Dashboard** (Angular Assignment).

This API provides endpoints for managing **Employees**, **Applicants**, **Departments**, and the **Dashboard Summary** for HR use cases.

---

## 🚀 Features

- User Authentication (Signup / Login / Refresh Token)
- Employee CRUD operations
- Applicant management (with status updates)
- Department management (with employee counts)
- Dashboard summary API (for Angular dashboard cards)
- MongoDB-based persistence
- Modular structure with controllers, models, routes
- File upload support for employee documents

---

## 🗂 Folder Structure

Employee-Backend/
├─ src/
│ ├─ config/
│ │ └─ db.js
│ ├─ controllers/
│ │ ├─ auth.controller.js
│ │ ├─ employees.controller.js
│ │ ├─ applicants.controller.js
│ │ ├─ departments.controller.js
│ │ ├─ documents.controller.js
│ │ └─ dashboard.controller.js
│ ├─ middlewares/
│ │ ├─ errorHandler.js
│ │ ├─ upload.js
│ │ └─ requireAuth.js # (optional JWT middleware)
│ ├─ models/
│ │ ├─ User.js
│ │ ├─ Employee.js
│ │ ├─ Applicant.js
│ │ └─ Department.js
│ ├─ routes/
│ │ ├─ auth.routes.js
│ │ ├─ employees.routes.js
│ │ ├─ applicants.routes.js
│ │ ├─ departments.routes.js
│ │ ├─ documents.routes.js
│ │ └─ dashboard.routes.js
│ ├─ utils/
│ │ ├─ responseWrapper.js
│ │ 
│ └─ server.js
├─ .env
├─ package.json
└─ README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone URL
cd directory_name

npm install

3️⃣ Configure Environment Variables

Create a .env file in the root with:
PORT=4000
MONGO_URI=mongodb://localhost:27017/ems_db
JWT_SECRET=replace_with_a_secret
UPLOAD_DIR=uploads

4️⃣ Run the Server
node src/server.js


Server will start at:
👉 http://localhost:4000

📡 API Endpoints
🧠 Authentication Module

📌 Base URL: /api/auth
| Endpoint   | Method | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| `/signup`  | POST   | Register a new HR user                                    |
| `/login`   | POST   | Login existing user and receive `accessToken`             |
| `/refresh` | GET    | Generate a new `accessToken` using refresh token (cookie) |


🧭 Dashboard
Endpoint	Method	Description	Example
/api/dashboard/summary	GET	Returns totals for employees, applicants, departments, and active roles
[GET] http://localhost:4000/api/dashboard/summary

Responce:
{
  "totalEmployees": 42,
  "totalApplicants": 18,
  "departmentCount": 5,
  "activeJobRoles": 7
}

👥 Employees

| Endpoint                       | Method | Description                                     |
| ------------------------------ | ------ | ----------------------------------------------- |
| `/api/employees`               | GET    | Get all employees (supports filters/search)     |
| `/api/employees/:id`           | GET    | Get single employee by ID                       |
| `/api/employees`               | POST   | Add new employee                                |
| `/api/employees/:id`           | PUT    | Update existing employee                        |
| `/api/employees/:id`           | DELETE | Delete employee                                 |
| `/api/employees/:id/documents` | POST   | Upload employee document (FormData key: `file`) |

💼 Applicants

| Endpoint                     | Method | Description                                          |
| ---------------------------- | ------ | ---------------------------------------------------- |
| `/api/applicants`            | GET    | Get list of all applicants (supports filters)        |
| `/api/applicants/:id`        | GET    | Get applicant by ID                                  |
| `/api/applicants`            | POST   | Add a new applicant (supports file upload)           |
| `/api/applicants/:id/status` | PUT    | Update applicant status (New, Shortlisted, Rejected) |


🏢 Departments

| Endpoint               | Method | Description                               |
| ---------------------- | ------ | ----------------------------------------- |
| `/api/departments`     | GET    | Get all departments (with employee count) |
| `/api/departments`     | POST   | Add a new department                      |
| `/api/departments/:id` | PUT    | Update department                         |
| `/api/departments/:id` | DELETE | Delete department                         |

📄 Documents (Optional)

| Endpoint             | Method | Description             |
| -------------------- | ------ | ----------------------- |
| `/api/documents`     | GET    | List uploaded documents |
| `/api/documents/:id` | DELETE | Delete a document       |


🧠 Angular Developer Notes

Base API URL:

http://localhost:4000/api/


Available API Modules:

/api/dashboard/summary → For dashboard totals

/api/employees → For Employee CRUD

/api/applicants → For Applicant CRUD + status updates

/api/departments → For Department CRUD (optional)

/api/documents → For document listing/upload (optional)

Cross-Origin Access:
CORS is enabled for all origins (app.use(cors({ origin: "*" }))),
so Angular can consume APIs without additional setup.

🧩 Sample Dashboard Summary (for Angular Dashboard Page)

You can use /api/dashboard/summary to render cards like:
| Metric           | Example |
| ---------------- | ------- |
| Total Employees  | 42      |
| Total Applicants | 18      |
| Department Count | 5       |
| Active Roles     | 7       |


Example Angular usage:

this.http.get(`${environment.apiUrl}/dashboard/summary`).subscribe(data => {
  this.summary = data;
});


🪄 License

This project is for educational and recruitment purposes only.
Feel free to modify and extend as needed.
```
