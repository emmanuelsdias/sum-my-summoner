import fetchRiotData from "../api/api.js";
import summoners from "../database/summoner.js";

// Summoner existence
function doesSummonerExist(region, username) {
  if (summoners[region][username]) {
    return true;
  }
  return false;
}

// Summoner reading
function readSummoner(region, username, res) {
  res.status(200).json(summoners[region][username]);
}

// Summoner creation
async function createSummoner(region, username, res) {
  try {
    summoners[region][username] = await fetchRiotData(region, username);
    res.status(200).json(summoners[region][username]);
  } catch (error) {
    if (error.message === "Summoner not found") {
      res.status(404).json({ error: "Summoner not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Summoner update
export async function updateSummoner(region, username, res) {
  await createSummoner(region, username, res);
}

// Summoner search
export async function searchSummoner(region, username, res) {
  if (doesSummonerExist(region, username)) {
    readSummoner(region, username, res);
  } else {
    await createSummoner(region, username, res);
  }
}
