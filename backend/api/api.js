import fetch from "node-fetch";

import SummonerData from "../models/summoner.js";
import API_KEY from "./riotApiKey.js";

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
  const API_URL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`;
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "X-Riot-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 404) {
      throw new Error("Summoner not found");
    } else if (!response.ok) {
      throw new Error("Unknown error");
    }
    const data = await response.json();
    return new SummonerData(
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
