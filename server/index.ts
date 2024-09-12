import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import inventoryRoutes from "./routes/inventoryRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
