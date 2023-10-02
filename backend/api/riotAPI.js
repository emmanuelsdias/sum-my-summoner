const fetch = require('node-fetch');
const apiKey = require('./config.js');

const parseRegion = (region) => {
  if (region === 'br') {
    return 'br1';
  } else if (region === 'na') {
    return 'na1';
  } else {
    throw new Error('Invalid region');
  }
}

async function fetchRiotData(region, username) {
  region = parseRegion(region);

  const apiUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Riot-Token': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from RIOT API');
    }

    const data = await response.json();

    return {
      username: data.name,
      level: data.summonerLevel,
      iconId: data.profileIconId,
    };
  } catch (error) {
    console.error('Error fetching data from RIOT API:', error);
    throw error;
  }
}

module.exports = fetchRiotData;