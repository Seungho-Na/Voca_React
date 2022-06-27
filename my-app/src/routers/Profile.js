import { auth } from 'fbase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'css/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = async (event) => {
    await signOut(auth);
    navigate('/', { replace: true });
  };
  return (
    <div className="profileContainer">
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};

export default Profile;
