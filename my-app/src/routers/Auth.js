import React, { useState } from 'react';
import { auth } from 'fbase';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import 'css/Auth.css';

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
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
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
    <div className="container">
      <span className='authLogo'>Voca React</span>
      <form onSubmit={onSubmit} className="authForm">
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
      <button name="google" onClick={onSocialClick}>
        Continue with Google
      </button>
      <button name="github" onClick={onSocialClick}>
        Continue with github
      </button>
    </div>
  );
};

export default Auth;
