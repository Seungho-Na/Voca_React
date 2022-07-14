import React from 'react';
import { Link } from 'react-router-dom';
import 'css/Navigation.css';
const Navigation = () => {
  return (
    <ul className="navigation">
      <li>
        <Link to="/" className="navigation__link">
          home
        </Link>
      </li>
      <li>
        <Link to="add" className="navigation__link">
          add
        </Link>
      </li>
      <li>
        <Link to="note" className="navigation__link">
          note
        </Link>
      </li>
      <li>
        <Link to="test" className="navigation__link">
          test
        </Link>
      </li>
      <li>
        <Link to="profile" className="navigation__link">
          profile
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
