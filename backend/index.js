import cors from "cors";
import express from "express";
import helmet from "helmet";

import summonerRouter from "./routes/summoner.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/summoner/", summonerRouter);

export default app;