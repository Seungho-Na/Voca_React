import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'fbase';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const { uid, displayName } = user;
        setUserObj({
          uid,
          displayName,
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return init ? (
    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
  ) : (
    <div>initailizing...</div>
  );
}

export default App;
