import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()); //allows for JSON data in the request body

app.use("/api/products", productRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  connectDB();
  console.log("server started at http://localhost:"+PORT);
});

//bCF2Rp9oodrgYbhm
