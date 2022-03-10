import React from 'react';
import styled from 'styled-components';

const Notification = styled.p`
  margin-top: 15px;
  padding: 5px 10px;
  border-radius: 3px 0px 0px 3px;
  background-color: #f8f8f8;
  border-left: 5px solid
    ${(props) =>
      props.type === 'success'
        ? 'green'
        : props.type === 'error'
        ? 'red'
        : 'white'};
`;

const Message = ({ type, children }) => {
  return <Notification type={type}>{children}</Notification>;
};

export default Message;
