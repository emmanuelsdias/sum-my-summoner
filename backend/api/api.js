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

const parseMainRegion = (region) => {
  if (region === "br") {
    return "americas";
  } else if (region === "na") {
    return "americas";
  } else {
    throw new Error("Invalid region");
  }
};

async function fetchRiotData(region, username) {
  const parsedRegion = parseRegion(region);
  const summonerAPIURL = `https://${parsedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`;

  try {
    // Fetch summoner data
    const summonerResponse = await fetch(summonerAPIURL, {
      method: "GET",
      headers: {
        "X-Riot-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (summonerResponse.status === 404) {
      throw new Error("Summoner not found");
    } else if (!summonerResponse.ok) {
      throw new Error("Unknown error");
    }

    const summonerData = await summonerResponse.json();

    const mainRegion = parseMainRegion(region);
    const puuid = summonerData.puuid;
    const numMatches = 20;

    const matchlistAPIURL = `https://${mainRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${numMatches}`;

    // Fetch matchlist data
    const matchlistResponse = await fetch(matchlistAPIURL, {
      method: "GET",
      headers: {
        "X-Riot-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!matchlistResponse.ok) {
      throw new Error("Failed to fetch matchlist data");
    }

    const matchlistData = await matchlistResponse.json();

    // Fetch match details for each match in the matchlist
    const matchResults = await Promise.all(
      matchlistData.map(async (matchId) => {
        const matchDetails = await fetchMatchDetails(mainRegion, matchId);
        // Determine if the summoner won or lost based on match details
        const participantId = matchDetails.info.participants.findIndex(
          (participant) => participant.puuid === puuid
        );
        return matchDetails.info.participants[participantId].win;
      })
    );

    // Calculate Win/Loss ratio
    const wins = matchResults.filter((result) => result === true).length;
    const losses = matchResults.length - wins;
    
    return new SummonerData(
      summonerData.name,
      summonerData.summonerLevel,
      summonerData.profileIconId,
      wins,
      losses,
    );
  } catch (error) {
    console.error("Failed to fetch data from RIOT API:", error);
    throw error;
  }
}

async function fetchMatchDetails(mainRegion, matchId) {
  const matchAPIURL = `https://${mainRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;

  try {
    const response = await fetch(matchAPIURL, {
      method: "GET",
      headers: {
        "X-Riot-Token": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch match details");
    }

    const matchData = await response.json();
    return matchData;
  } catch (error) {
    console.error("Failed to fetch match details from RIOT API:", error);
    throw error;
  }
}

export default fetchRiotData;
