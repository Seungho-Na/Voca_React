import React, { useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Add from 'routers/Add';
import Auth from 'routers/Auth';
import Main from 'routers/Main';
import Profile from 'routers/Profile';
import Note from 'routers/Note';
import Navigation from './components/Navigation';

const AppRouter = ({ isLoggedIn }) => {
  const [notes, setNotes] = useState({
    '일드/애니': [],
    JLPT1급: [],
  });
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Main />} />
            <Route
              exact
              path="/profile"
              element={<Profile />}
            />
            <Route
              exact
              path="/add"
              element={
                <Add notes={notes} setNotes={setNotes} />
              }
            />
            <Route
              exact
              path="/note"
              element={<Note notes={notes} />}
            />
          </>
        ) : (
          <Route
            exact
            path="/"
            element={<Auth />}
          />
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
