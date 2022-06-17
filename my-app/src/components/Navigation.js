import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="add">add</Link>
      </li>
      <li>
        <Link to="profile">profile</Link>
      </li>
      <li>
        <Link to="note">note</Link>
      </li>
    </ul>
  );
};

export default Navigation;
