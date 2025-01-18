import { connectDB } from "./config/db.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import ingredients from "./routes/ingredients.js";
// import recipes from "./routes/recipes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/ingredients", ingredients);
// app.use("/api/recipes", recipes);

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
