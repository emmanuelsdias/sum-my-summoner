import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { readData } from '../api/readData.js';
import { getProfileIconUrl } from '../api/getProfileIconUrl.js';

import DecoratedTitle from "../components/DecoratedTitle.js";

// TODO: Add option to update data

function ContentPage() {
  const { region, username } = useParams();
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function readDataFromAPI() {
      const data = await readData(region, username);
      if (data) {
        setUserData(data);
      } else {
        setNotFound(true);
      }
    }
    readDataFromAPI();
  }, [region, username]);

  return (
    <div id='content-page'>
      <div id='content'>
        <DecoratedTitle title={'SUMMONER'} />
        {notFound
          ? <>
            <h1>NOT FOUND...</h1>
            <p>They may not exist or never have been searched in our servers.</p>
            <p>Check if you searched using the correct region.</p>
          </>
          : <>
            {userData
              ? <>
                <h1>{userData.name}</h1>
                <img src={getProfileIconUrl(userData.iconId)} id='profile-icon' alt='' />
                <h1>Level {userData.level}</h1>
              </>
              // TODO: Add loading animation
              : <h1>LOADING...</h1>}
          </>
        }
      </div>

    </div>
  );
}

export default ContentPage;
