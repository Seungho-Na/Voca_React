import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">main</Link>
      </li>
      <li>
        <Link to="add">add</Link>
      </li>
      <li>
        <Link to="profile">profile</Link>
      </li>
    </ul>
  );
};

export default Navigation;
