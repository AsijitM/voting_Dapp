import React from 'react';

export default function Connected(props) {
  return (
    <div className="connected-container">
      <h1 className="connected-header">You are Connected To Metamask</h1>
      <p className="connected-account">Metamask Account:{props.account} </p>
    </div>
  );
}
