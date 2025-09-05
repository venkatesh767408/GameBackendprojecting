const cors = require("cors");
const userRoutes = require("./src/gamemodules/user/user.routes");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./src/config/db");

// Middleware
app.use(cors({
  origin: process.env.API_URL || "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use("/api", userRoutes);

// Start Express Server after DB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });
