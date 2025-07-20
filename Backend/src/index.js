import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import clientRouter from "./routes/clientRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/admin/api/", adminRouter);
app.use("/client/api/", clientRouter);

app.listen(PORT, "0.0.0.0", () => console.log(`listening on port ${PORT}`));

export default app;
