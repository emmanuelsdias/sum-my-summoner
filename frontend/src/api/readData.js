const serverBaseURL = require('./config.js');

export async function readData(region, username) {
  try {
    const response = await fetch(`${serverBaseURL}/read/${region}/${username}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return null;
}