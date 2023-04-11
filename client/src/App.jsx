import { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';
import { contractABI, contractAddress } from './constants/constatnt';
import './App.css';
import Login from './components/Login';
import Connected from './components/connected';

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(true);
  const [remainingTime, setRemainingTime] = useState('');

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && accounts !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on(`accountsChanged`, handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      }
    };
  }, []);

  async function getCurrentStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        //Making a connection with ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        const address = await signer.getAddress();
        console.log('Metamask Connected' + address);
        setIsConnected(true);
        setAccount(address);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.error('Metamask is Not detected in Browser');
    }
  }

  return (
    <div>
      {isConnected ? (
        <Connected account={account} />
      ) : (
        <Login connectWallet={connectToMetamask} />
      )}
    </div>
  );
}

export default App;
