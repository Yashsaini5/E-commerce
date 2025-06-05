const express = require("express");
const dotenv = require("dotenv");
const setupMiddleware = require("./middleware/setUpMiddleware");
const setupRoutes = require("./routes/index");
const connectDB = require("./config/db");
const app = express();
dotenv.config();

setupMiddleware(app);

setupRoutes(app);

connectDB();

// Define a test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
