

const CONTRACT_ADDRESS = '0xbba98de61dea6d1b7bfee2c7e1de4210f76a579f';

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