import React from 'react';
import { VscLoading } from 'react-icons/vsc';
import styled from 'styled-components';

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  }
  svg {
    animation: spin 2s linear infinite;
    font-size: 100px;
  }
`;

const Loading = () => {
  return (
    <LoadingScreen>
      <VscLoading />
    </LoadingScreen>
  );
};

export default Loading;
