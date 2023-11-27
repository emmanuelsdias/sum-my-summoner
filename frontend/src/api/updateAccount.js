import serverBaseURL from "./config.js";

async function updateAccount(region, username) {
  try {
    const response = await fetch(
      `${serverBaseURL}/summoner/update/${region}/${username}`
    );
    if (response.status === 200) {
      return await response.json();
    }
    // Handle other non-200 status codes as errors
    console.log("Unknown error (updateAccount):", response);
  } catch (error) {
    // Handle 404 errors separately
    if (error.response && error.response.status === 404) {
      console.log("No account found 404 (updateAccount):", error.response);
    } else {
      console.error("Error in connection (updateAccount):", error.response);
    }
  }
  return null;
}

export default updateAccount;
