# Sum My Summoner

![Sum My Summoner screenshot](./preview.png)

An web application built with React that allows users to search for any League of Legends summoner name and retrieve statistics and graphs related to the account. The project was developed for the course CES-26: Web Application Development at ITA (Instituto Tecnológico de Aeronáutica, Brazil). Midway through the course, the project's requirements gained an emphasis on authentication and security.

## How to Run

To properly run the application, you will need to create a Firebase project and add the Firebase configuration according to `frontend/src/config/secrets_REPLACE.js`. Then, you will also need your own Riot Games API key and add it according to `backend/api/riotApiKey_REPLACE.js`. Lastly, you will need to have a `server.key` and `server.cert` file in the `backend/bin` folder, to run the backend server with HTTPS.

Once all of that is done, you can run the application by running both the backend and the frontend. To run the backend, `npm install` and `npm run start` while in the `backend` folder. The backend will run on port 3001. Meanwhile, to run the frontend, `npm install` and `npm run start` while in the `frontend` folder. The frontend will run on port 3000. Certify that `backendUrl` in `frontend/src/api/backendUrl.js` is set to your backend server (in case it isn't running on port 3001). 

## Backend

The backend is a Node.js server that uses the Express framework. It is responsible for communicating with the Riot Games API and returning the data to the frontend. The backend also caches the data which it already retrieved from the API, so that it does not need to make the same request twice (unless the user requests it via the refresh button).

## Frontend

The frontend is a React application responsible for displaying the data retrieved from the backend in a user-friendly way. It uses a Firebase authentication system to allow users to create accounts and log in. Only logged in users should have access the application (and be able to search for a summoner's info). The login can be made via email or using a Google account.
