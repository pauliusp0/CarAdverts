import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';

// Components
import Button from '../Button';
import Message from '../Message';
import useEndpoint from '../../Hooks/useEndpoints';

const RegisterForm = () => {
  // State
  // -- Local state
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ message: '', type: '' });
  // -- Global state
  const { dispatch } = useContext(UserContext);
  // -- Redirects
  const history = useHistory();
  // -- Refs
  const passwordRef = useRef();
  const emailRef = useRef();

  // hooks
  const signupAPI = useEndpoint('signup');

  // Custom functions
  const signupHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      axios
        .post(signupAPI, {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          surname: surname.charAt(0).toUpperCase() + surname.slice(1),
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data.registrationStatus === 'success') {
            const userId = res.data.userId;
            localStorage.setItem('user', userId);
            dispatch({ type: 'REGISTER', payload: userId });
            history.push('/my-account');
          } else {
            setMessage({ message: res.data.message, type: 'error' });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            emailRef.current.focus();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setMessage({ message: 'Passwords do not match', type: 'error' });
      setPassword('');
      setConfirmPassword('');
      passwordRef.current.focus();
    }
  };
  return (
    <section>
      <h2>
        <span>New user?</span> Sign Up!
      </h2>

      <form onSubmit={signupHandler}>
        <div>
          <label>Name</label>
          <input
            value={name}
            type='text'
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Surname</label>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type='text'
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            required
            ref={emailRef}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            required
            ref={passwordRef}
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            required
          />
        </div>

        <div>
          <Button text='Sign Up' />
        </div>
      </form>

      {message.message && (
        <Message type={message.type}>{message.message}</Message>
      )}
    </section>
  );
};

export default RegisterForm;
