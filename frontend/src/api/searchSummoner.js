import backendURL from "./backendUrl.js";

async function searchSummoner(region, username) {
  try {
    const response = await fetch(
      `${backendURL}/summoner/search/${region}/${username}`
    );
    if (response.status === 200) {
      return await response.json();
    }
    // Handle other non-200 status codes as errors
    console.log("Unknown error (searchSummoner):", response);
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log("No account found 404 (searchSummoner):", error.response);
    } else {
      console.error("Error in connection (searchSummoner):", error.response);
    }
  }
  return null;
}

export default searchSummoner;
