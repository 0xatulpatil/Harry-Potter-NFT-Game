import React from 'react';
import { useState,useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import SelectCharacter from './Components/SelectCharacter';
import { CONTRACT_ADDRESS, transformCharacterData } from './constants';
import HarryPotterABI from './utils/HarryPotter.json';
import { ethers } from 'ethers';


const App = () => {

  //states
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);




const CheckIfWalletIsConnected = async () =>{
  try{
  const {ethereum} = window;

  if(!ethereum){
    console.log("Make sure you have Metamask");
  }else{
    console.log("We have the eth object",ethereum);

    const accounts = await ethereum.request({method:"eth_accounts"});

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  }
}catch(err){
  console.log(err);
}  
};

//render methods
const renderContent = () =>{
  if (!currentAccount) {
    return (
      <div className="connect-wallet-container">
          
      <img
        // src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
        src="https://c.tenor.com/pBYo-PJdBMAAAAAC/harry-potter-daniel-radcliffe.gif"
        alt="Harry Potter Gif"
      />

       <button
        className="cta-button connect-wallet-button"
        onClick={()=>{connectWalletButton()}}
      >
        Connect Wallet To Get Started
      </button>

    </div>
    );
    /*
     * Scenario #2
     */
  } else if (currentAccount && !characterNFT) {
    return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
  }
}


const connectWalletButton = async () =>{
  try{
    const {ethereum} = window;

    
    if (!ethereum) {
      alert('Get MetaMask!');
      return;
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    console.log("Connected", accounts[0]);
    setCurrentAccount(accounts[0]);
  }catch(err){
    console.log(err);
  }
}

useEffect(()=>{
  CheckIfWalletIsConnected();
},[]);


useEffect(() => {
  
  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
     HarryPotterABI.abi,
      signer
    );

    const txn = await gameContract.checkIfUserHasNFT();
    if (txn.name) {
      console.log('User has character NFT');
      setCharacterNFT(transformCharacterData(txn));
    }
  };

  
  if (currentAccount) {
    console.log('CurrentAccount:', currentAccount);
    fetchNFTMetadata();
  }
}, [currentAccount]);

return (
  <div className="App">
    <div className="container">
      <div className="header-container">
        <p className="header gradient-text">⚡ Harry Potter ⚡</p>
        <p className="sub-text">Team up and defeat the Dark Lord</p>
        {renderContent()}
      </div>
      <div className="footer-container">
        <a
          className="footer-text"
         
          target="_blank"
          rel="noreferrer"
        >{`built by Atul Patil`}</a>
      </div>
    </div>
  </div>
);

}
export default App;
