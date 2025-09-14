import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json()); //allows for JSON data in the request body

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:" + PORT);
});
