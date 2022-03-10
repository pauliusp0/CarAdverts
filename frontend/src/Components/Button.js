import React from 'react';
import styled from 'styled-components';

const ButtonPrimary = styled.button`
  display: inline-block;
  border: 0;
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 1em;
  text-decoration: none;
  background-color: var(--primary-color);
  color: var(--text-light-color);
  cursor: pointer;
`;

const Button = ({ text, action, id }) => {
  return (
    <ButtonPrimary data-id={id} onClick={action}>
      {text}
    </ButtonPrimary>
  );
};

export default Button;
