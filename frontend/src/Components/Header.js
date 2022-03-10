import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navigation = styled.header`
  background-color: var(--primary-color);

  > div {
    margin: 0 auto;
    max-width: 1024px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  div > div {
    color: var(--text-light-color);
    font-size: 1.3em;
    font-weight: bold;
    text-transform: uppercase;
  }

  nav ul {
    display: flex;
    list-style: none;
  }
  nav ul li {
    padding: 15px;
  }
  nav ul li a {
    color: var(--text-light-color);
    text-decoration: none;
  }
  nav ul li:hover {
    background: white;
  }
  nav ul li:hover a {
    color: var(--primary-color);
  }
`;

const Header = () => {
  return (
    <Navigation>
      <div>
        <div>
          <div>Car Adverts</div>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {localStorage.getItem('user') ? (
              <li>
                <Link to='/my-account'>My Account</Link>
              </li>
            ) : (
              <li>
                <Link to='/login'>Log In/Sign Up</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </Navigation>
  );
};

export default Header;
