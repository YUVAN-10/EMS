require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// --------------- Middleware ---------------

app.use(cors());
app.use(express.json());

// --------------- Routes ---------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "EMS API is running" });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (must be last)
app.use(errorHandler);

// --------------- Start Server ---------------

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
