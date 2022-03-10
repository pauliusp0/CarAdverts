import React from 'react';
import styled from 'styled-components';

// Components
import LoginForm from '../Components/Forms/LoginForm';
import RegisterForm from '../Components/Forms/RegisterForm';

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 15px;

  section > h1 {
    margin: 40px 20px;
    text-align: center;
    font-size: 1.7em;
  }

  div {
    display: flex;
    justify-content: space-between;
  }

  div > section {
    width: calc(100% / 2 - 30px);
    padding: 30px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
      0 0 0 1px rgba(10, 10, 10, 0.02);
  }
  div > section > h2 > span {
    font-weight: 400;
  }
  form {
    margin-top: 10px;
  }

  form label {
    font-size: 1.2em;
  }

  form input {
    margin-bottom: 15px;
    padding: 5px 7px;
    font-size: 1em;
    color: #555;
  }

  form > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const LoginScreen = () => {
  return (
    <main>
      <Container>
        <section>
          <h1>Sign up/ Log In</h1>
        </section>

        <div>
          <LoginForm />
          <RegisterForm />
        </div>
      </Container>
    </main>
  );
};

export default LoginScreen;
