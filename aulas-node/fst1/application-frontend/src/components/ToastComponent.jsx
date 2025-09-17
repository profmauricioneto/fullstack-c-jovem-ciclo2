import React from 'react';
import styled from 'styled-components';

const ToastComponent = (props) => {
  return (
    <StyledWrapper>
      <div className="toast">
        <div className="toast-content">
          {props.message}
        </div>
        <div className="toast-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.795 8.342l-5.909 9.545a1 1 0 0 1-1.628 0l-3.182-4.909a1 1 0 0 1 1.629-1.165l2.556 3.953L14.165 7.51a1 1 0 0 1 1.63 1.165z" />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .toast {
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .toast-icon svg {
    width: 30px;
    height: 20px;
    fill: #fff;
  }

  .toast-content {
    font-family: Arial, sans-serif;
    font-size: 14px;
  }`;

export default ToastComponent;
