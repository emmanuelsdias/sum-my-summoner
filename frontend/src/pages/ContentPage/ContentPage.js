import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./style.css";
import getProfileIconUrl from "../../api/getProfileIconUrl.js";
import searchSummoner from "../../api/searchSummoner.js";
import updateSummoner from "../../api/updateSummoner.js";
import refreshIcon from "../../images/refresh.svg";
import DecoratedTitle from "../../components/DecoratedTitle/DecoratedTitle.js";
import DonutChart from "../../components/DonutChart/DonutChart.js";

function ContentPage() {
  const { region, username } = useParams();
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const [isUpdating, setIsUpdating] = useState(false);

  const onRefreshClick = async () => {
    setIsUpdating(true);
    try {
      const response = await updateSummoner(region, username);
      if (response) {
        const updatedData = await searchSummoner(region, username);
        if (updatedData) {
          setUserData(updatedData);
        } else {
          setNotFound(true);
        }
      }
    } catch (error) {
      console.error("Error updating summoner:", error);
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    async function readDataFromAPI() {
      const data = await searchSummoner(region, username);
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
                <div className="username-and-refresh-icon">
                  <h1>{userData.username}</h1>
                  <img
                    className={isUpdating ? "updating" : ""}
                    onClick={onRefreshClick}
                    src={refreshIcon}
                    alt="hyperplane logo"
                  />
                </div>
                <img
                  src={getProfileIconUrl(userData.iconId)}
                  id="profile-icon"
                  alt=""
                />
                <h1>Level {userData.level}</h1>
                <div style={{margin: "10px"}}>
                  <DonutChart
                    data={[
                      { label: "Wins", value: userData.wins },
                      { label: "Losses", value: userData.losses },
                    ]}
                  />
                </div>

                <h2>
                  {userData.wins}W | {userData.losses}L
                </h2>
              </>
            ) : (
              <h1>LOADING...</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ContentPage;
