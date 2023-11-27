import fetch from "node-fetch";

import AccountData from "./models.js";

// This key is already expired, please use your own key
const apiKey = "VALID_KEY_HERE";

const parseRegion = (region) => {
  if (region === "br") {
    return "br1";
  } else if (region === "na") {
    return "na1";
  } else {
    throw new Error("Invalid region");
  }
};

async function fetchRiotData(region, username) {
  region = parseRegion(region);
  const apiUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Riot-Token": apiKey,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      throw new Error("Account not found");
    } else if (!response.ok) {
      throw new Error("Unknown error");
    }
    const data = await response.json();
    return new AccountData(
      data.name, // username
      data.summonerLevel, // level
      data.profileIconId // iconId
    );
  } catch (error) {
    console.error("Failed to fetch data from RIOT API:", error);
    throw error;
  }
}

export default fetchRiotData;
