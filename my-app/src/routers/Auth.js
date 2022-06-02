import React, { useState } from 'react';
import { auth } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newAccount, setNewAccont] = useState(false);
  const [error, setError] = useState('');
  const toggleAccount = () => {
    setNewAccont((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(error.massage);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
        />

        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? 'Create account' : 'Login'}
        />
        {error}
      </form>
      <span type="submit" onClick={toggleAccount}>
        {newAccount
          ? 'you have account? click here'
          : 'create account'}
      </span>
    </>
  );
};

export default Auth;
