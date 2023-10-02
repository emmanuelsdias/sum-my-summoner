import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ContentPage() {
  const { region, username } = useParams();

  return (
    <div>
      <h1>Content Page</h1>
      <p>Region: {region}</p>
      <p>Username: {username}</p>
      <Link to='/'>Back to Main Page</Link>
    </div>
  );
}

export default ContentPage;
