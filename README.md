# Employee Management System (EMS)

A full-stack Employee Management System built with React.js and Node.js. Manage your workforce with an intuitive dashboard, full CRUD operations, search, and filter capabilities.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js 18 (Vite), React Router 6 |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB atlas (Mongoose ODM)              |
| Styling    | Vanilla CSS (custom design system)  |
| HTTP       | Axios                               |
| Toasts     | react-hot-toast                     |
| Icons      | react-icons (Feather Icons)         |

---

## Features

- **Dashboard** — Stat cards showing Total, Active, and Inactive employee counts with recent employees table
- **Employee Listing** — Paginated table with all employee details
- **Add Employee** — Form with full client & server-side validation
- **Edit Employee** — Pre-filled form to update employee data
- **Delete Employee** — Confirmation modal before deletion
- **Search** — Search employees by name (case-insensitive, debounced)
- **Filter** — Filter by Department and Status
- **Responsive Design** — Mobile-friendly sidebar, tables scroll horizontally
- **Toast Notifications** — Success/error feedback on every action
- **Clean Error Handling** — Meaningful HTTP status codes and error messages

---

## Folder Structure

```
EMS/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Button, Input, Select, Modal, Loader, Badge, SearchBar
│   │   │   ├── dashboard/           # StatCard
│   │   │   ├── employees/           # EmployeeTable, EmployeeForm, FilterBar
│   │   │   └── layout/              # Header, Sidebar, Layout
│   │   ├── constants/               # Centralized constants
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── pages/                   # Dashboard, Employees, AddEmployee, EditEmployee, NotFound
│   │   ├── services/                # Axios API service layer
│   │   └── utils/                   # Helper functions
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js backend
│   ├── config/                      # Database connection, constants
│   ├── controllers/                 # Route handler logic
│   ├── middleware/                   # Validation, error handling
│   ├── models/                      # Mongoose schemas
│   ├── routes/                      # Express route definitions
│   ├── utils/                       # Server-side helpers
│   ├── server.js                    # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** (local or Atlas cloud instance)
- **npm** (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ems.git
cd ems
```

### 2. Setup Backend

```bash
cd server
npm install
```

Optionally, set the MongoDB URI via environment variable:

```bash
# Default: mongodb://localhost:27017/ems_db
set MONGO_URI=mongodb://localhost:27017/ems_db
```

Start the server:

```bash
npm run dev     # Development (auto-restart on file changes)
npm start       # Production
```

Server runs on **http://localhost:5000**

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on **http://localhost:3000** and proxies API requests to port 5000.

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Health Check

| Method | Endpoint       | Description       |
|--------|----------------|-------------------|
| GET    | `/api/health`  | Check API status  |

### Employee Endpoints

| Method | Endpoint              | Description                               | Status Codes     |
|--------|-----------------------|-------------------------------------------|------------------|
| GET    | `/api/employees`      | List employees (search, filter, paginate) | 200              |
| GET    | `/api/employees/stats`| Dashboard statistics                      | 200              |
| GET    | `/api/employees/:id`  | Get single employee                       | 200, 404         |
| POST   | `/api/employees`      | Create new employee                       | 201, 400, 409    |
| PUT    | `/api/employees/:id`  | Update employee                           | 200, 400, 404, 409 |
| DELETE | `/api/employees/:id`  | Delete employee                           | 200, 404         |

### Query Parameters (GET /api/employees)

| Param      | Type   | Default | Description                      |
|------------|--------|---------|----------------------------------|
| search     | string | —       | Search by name (partial match)   |
| department | string | —       | Filter by department             |
| status     | string | —       | Filter by status (Active/Inactive) |
| page       | number | 1       | Page number                      |
| limit      | number | 10      | Results per page (max 100)       |

### Request Body (POST / PUT)

```json
{
  "fullName": "John Doe",
  "email": "john@company.com",
  "mobile": "9876543210",
  "department": "Engineering",
  "designation": "Senior Developer",
  "joiningDate": "2024-01-15",
  "status": "Active"
}
```

### Response Format

```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": { ... }
}
```

---

## Development Flow

1. **Backend-first**: Models → Middleware → Controllers → Routes → Server
2. **Frontend**: Design System (CSS) → Constants/Services → Reusable Components → Pages → App Routing
3. **Integration**: API proxy via Vite dev server
4. **Testing**: Manual testing of all CRUD operations, search, and filters

---

## Application Flow

```
User → React App (Vite) → Axios Service Layer → Express API → Mongoose ODM → MongoDB
                                                    ↓
                                             Validation Middleware
                                             Error Handler Middleware
```

1. User interacts with the React frontend
2. Service layer sends HTTP requests via Axios
3. Express receives requests, runs validation middleware
4. Controller executes business logic via Mongoose
5. Response flows back with consistent JSON format
6. Frontend displays data or error toasts

---

## Assumptions

1. MongoDB is running locally on default port 27017 (or provide `MONGO_URI` env var)
2. No authentication is implemented — this is an internal management tool
3. Email addresses must be unique across all employees
4. Mobile numbers must be exactly 10 digits
5. Department values are restricted to a predefined list
6. The application is designed for single-tenant usage

---

## License

MIT
