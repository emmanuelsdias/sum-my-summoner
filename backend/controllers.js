import fetchRiotData from "./api.js";
import data from "./database.js";

function doesAccountExist(region, username) {
  if (data[region][username]) {
    return true;
  }
  return false;
}

function readAccount(region, username, res) {
  res.status(200).json(data[region][username]);
}

async function createAccount(region, username, res) {
  try {
    data[region][username] = await fetchRiotData(region, username);
    res.status(200).json(data[region][username]);
  } catch (error) {
    if (error.message === "Account not found") {
      res.status(404).json({ error: "Account not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export async function updateAccount(region, username, res) {
  await createAccount(region, username, res);
}

export async function searchAccount(region, username, res) {
  if (doesAccountExist(region, username)) {
    readAccount(region, username, res);
  } else {
    await createAccount(region, username, res);
  }
}
