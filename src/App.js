import React from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚡ Harry Potter ⚡</p>
          <p className="sub-text">Team up and defeat the Dark Lord</p>
          <div className="connect-wallet-container">
            
            <img
              // src="https://64.media.tumblr.com/tumblr_mbia5vdmRd1r1mkubo1_500.gifv"
              src="https://c.tenor.com/pBYo-PJdBMAAAAAC/harry-potter-daniel-radcliffe.gif"
              alt="Monty Python Gif"
            />
          </div>
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
};

export default App;
