
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

// Debug imports step by step
console.log("Loading routes...");
import routes from "./src/routes/index.js";
console.log("Routes loaded successfully");

const app = express();
const PORT = process.env.PORT || 5002;

// Fix Mongoose deprecation warning
mongoose.set('strictQuery', false);

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:3001", 
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
console.log("Setting up routes...");
app.use("/api/v1", routes);
console.log("Routes setup complete");

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "MovieHaus API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/api/v1`);
  });
})
.catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});