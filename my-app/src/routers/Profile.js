import { auth } from 'fbase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = async (event) => {
    await signOut(auth);
    navigate("/", {replace: true})
  };
  return <button onClick={onLogOutClick}>Log out</button>;
};

export default Profile;
