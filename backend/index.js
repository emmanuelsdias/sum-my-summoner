import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import summonerRouter from "./routes/summoner.js";
import userRouter from "./routes/user.js";
import { localStrategySetup, googleStrategySetup } from "./config/user.js";


const app = express();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret-key",
  })
);
app.use(passport.initialize());
app.use(passport.session());
localStrategySetup(passport);
googleStrategySetup(passport);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/summoner/", summonerRouter);
app.use("/user/", userRouter);

export default app;
