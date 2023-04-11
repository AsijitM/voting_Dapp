import React from 'react';

export default function Login(props) {
  return (
    <div className="login-container">
      <h1 className="welcome-message">Welcome to Voting Dapp</h1>
      <button className="login-button" onClick={props.connectWallet}>
        Login Metamask
      </button>
    </div>
  );
}
