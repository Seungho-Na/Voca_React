import React, { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Add from 'routers/Add';
import Auth from 'routers/Auth';
import Home from 'routers/Home';
import Profile from 'routers/Profile';
import Note from 'routers/Note';
import Navigation from './Navigation';
import Test from 'routers/Test';
import NightModeButton from './NightModeButton';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <NightModeButton />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/profile"
              element={<Profile />}
            />
            <Route
              exact
              path="/add"
              element={<Add userObj={userObj} />}
            />
            <Route
              exact
              path="/note"
              element={
                <Note userObj={userObj} />
              }
            />
            <Route
              exact
              path="/test"
              element={
                <Test userObj={userObj} />
              }
            />
          </>
        ) : (
          <Route exact path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
