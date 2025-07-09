import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import carRouter from "./routes/carRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT;

app.use(cors());
app.use(express.json());
app.use("/api/", carRouter);

app.listen(PORT, "0.0.0.0", () => console.log(`listening on port ${PORT}`));
export default app;
