import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

// Components
import Button from '../Button';
import Message from '../Message';
import useEndpoint from '../../Hooks/useEndpoints';

const LoginForm = () => {
  // State
  // -- Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ message: '', type: '' });
  // -- Global state
  const { dispatch } = useContext(UserContext);
  // -- Redirects
  const history = useHistory();
  // -- Refs
  const emailRef = useRef();

  // hooks
  const loginAPI = useEndpoint('login');

  // Custom functions
  const loginHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(loginAPI, {
        email: email,
        password: password,
      })
      .then((res) => {
        const userId = res.data.userId;
        localStorage.setItem('user', userId);
        dispatch({ type: 'LOGIN', payload: userId });
        history.push('/my-account');
      })
      .catch((err) => {
        setMessage({ message: err.response.data.message, type: 'error' });
        setEmail('');
        setPassword('');
        emailRef.current.focus();
      });
  };
  return (
    <section>
      <h2>
        <span>Have account?</span> Log In!
      </h2>

      <form onSubmit={loginHandler}>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={emailRef}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <Button text='Log In' />
        </div>
      </form>
      {message.message && (
        <Message type={message.type}>{message.message}</Message>
      )}
    </section>
  );
};

export default LoginForm;
