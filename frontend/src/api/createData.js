const serverBaseURL = require('./config.js');

export async function createData(region, username) {
  try {
    const response = await fetch(`${serverBaseURL}/create/${region}/${username}`);
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