import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./style.css";
import getProfileIconUrl from "../../api/getProfileIconUrl.js";
import searchAccount from "../../api/searchAccount.js";

import DecoratedTitle from "../../components/DecoratedTitle/DecoratedTitle.js";

// TODO: Add option to update data

function ContentPage() {
  const { region, username } = useParams();
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);

  useEffect(() => {
    async function readDataFromAPI() {
      const data = await searchAccount(region, username);
      if (data) {
        setUserData(data);
      } else {
        setNotFound(true);
      }
    }
    readDataFromAPI();
  }, [region, username]);

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return (
    <div id="content-page" className="page">
      <div id="content">
        <DecoratedTitle title={"SUMMONER"} />
        {notFound ? (
          <>
            <h1>NOT FOUND...</h1>
            <p>
              They may not exist or never have been searched in our servers.
            </p>
            <p>Check if you searched using the correct region.</p>
          </>
        ) : (
          <>
            {userData ? (
              <>
                <h1>{userData.username}</h1>
                <img
                  src={getProfileIconUrl(userData.iconId)}
                  id="profile-icon"
                  alt=""
                />
                <h1>Level {userData.level}</h1>
              </>
            ) : (
              // TODO: Add loading animation
              <h1>LOADING...</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ContentPage;
