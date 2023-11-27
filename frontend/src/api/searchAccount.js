import serverBaseURL from "./config.js";

async function searchAccount(region, username) {
  try {
    const response = await fetch(
      `${serverBaseURL}/search/${region}/${username}`
    );
    if (response.status === 200) {
      return await response.json();
    }
    // Handle other non-200 status codes as errors
    console.log("Unknown error (searchAccount):", response);
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log("No account found 404 (searchAccount):", error.response);
    } else {
      console.error("Error in connection (searchAccount):", error.response);
    }
  }
  return null;
}

export default searchAccount;
