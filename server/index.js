import express from "express";
import cors from "cors";
import auth from "./routes/auth.js"
import connectDB from "./db/connect.js";
import "dotenv/config";


const app = express();

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/server/auth", auth)

const PORT = process.env.PORT || 8888;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
