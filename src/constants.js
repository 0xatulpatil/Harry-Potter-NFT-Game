

const CONTRACT_ADDRESS = '0x972d7589e51C7D03BCed670E1AC19c17d9fB690F';

const transformCharacterData = (characterData) => {
    return {
      name: characterData.name,
      imageURI: characterData.imageURI,
      hp: characterData.hp.toNumber(),
      maxHp: characterData.maxHp.toNumber(),
      attackDamage: characterData.attackDamage.toNumber(),
    };
  };


export { CONTRACT_ADDRESS, transformCharacterData };