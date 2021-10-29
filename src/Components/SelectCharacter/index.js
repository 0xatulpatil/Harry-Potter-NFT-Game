import React, { useEffect, useState } from 'react';
import './SelectCharacter.css';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/HarryPotter.json';


const SelectCharacter = ({ setCharacterNFT }) => {

const [characters, setCharacters] = useState([]);
const [gameContract, setGameContract] = useState(null);

// Render Methods
const renderCharacters = () =>
  characters.map((character, index) => (
    <div className="character-item" key={character.name}>
      <div className="name-container">
        <p>{character.name}</p>
      </div>
      <img src={character.imageURI} alt={character.name} />
      <button
        type="button"
        className="character-mint-button"
        onClick={mintCharacterNFTAction(index)}
      >{`Mint ${character.name}`}</button>
    </div>
  ));

//Mint NFT function

  const mintCharacterNFTAction = (characterId) => async () => {
    try {
      if (gameContract) {
        console.log('Minting character in progress...');
        const mintTxn = await gameContract.mintCharacterNFT(characterId);
        await mintTxn.wait();
        console.log('mintTxn:', mintTxn);
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error);
    }
  };


 useEffect(()=>{
   const {ethereum} = window;

   if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      myEpicGame.abi,
      signer
    );
    setGameContract(gameContract);
 }else{
   console.log("Eth object not foud")
 }},[]);


 useEffect(() => {
  const getCharacters = async () => {
    try {
      console.log('Getting contract characters to mint');

      const charactersTxn = await gameContract.getAllDefaultCharacters();
      console.log('charactersTxn:', charactersTxn);

      const characters = charactersTxn.map((characterData) =>
        transformCharacterData(characterData)
      );

      setCharacters(characters);
    } catch (error) {
      console.error('Something went wrong fetching characters:', error);
    }
  };

//callback method that will fire when an event is recieved

const onCharacterMint = async (sender, tokenId, characterIndex) =>{
  console.log(`CharacterNFTMinted- sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
  );

  //once NFT is minted, fetch metadata and set it in state so that we can move on to the next arena
if(gameContract){
  const characterNFT = await gameContract.checkIfUserHasNFT();
  console.log('CharacterNFT:', characterNFT);
  setCharacterNFT(transformCharacterData(characterNFT));
}
};

if(gameContract){
  getCharacters();

  gameContract.on('CharacterNFTMinted', onCharacterMint);
}

return () =>{


  if (gameContract) {
    getCharacters();
  }
}
}, [gameContract]);




  return (
    <div className="select-character-container">
    <h2>Mint Your Hero. Choose wisely.</h2>
    {characters.length > 0 && (
      <div className="character-grid">{renderCharacters()}</div>
    )}
  </div>
  );
};




export default SelectCharacter;