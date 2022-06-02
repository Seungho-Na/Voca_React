import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'fbase';
import AppRouter from 'Router';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
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
    <AppRouter isLoggedIn={isLoggedIn} />
  ) : (
    <div>initailizing...</div>
  );
}

export default App;
