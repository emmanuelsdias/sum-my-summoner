import express from "express";
import { searchAccount, updateAccount } from "./controllers.js";

const router = express.Router();

router.get("/search/:region/:username", async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  searchAccount(region, usernameNoCaps, res);
});

router.get("/update/:region/:username", async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  updateAccount(region, usernameNoCaps, res);
});

export default router;
