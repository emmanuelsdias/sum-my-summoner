import express from "express";
import { searchSummoner, updateSummoner } from "../controllers/summoner.js";

const router = express.Router();

// Summoner search
router.get("/search/:region/:username", async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  searchSummoner(region, usernameNoCaps, res);
});

// Summoner update
router.get("/update/:region/:username", async (req, res) => {
  const { region, username } = req.params;
  const usernameNoCaps = username.toLowerCase();
  updateSummoner(region, usernameNoCaps, res);
});

export default router;
