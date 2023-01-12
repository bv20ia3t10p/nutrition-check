require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      accounts: ['0x1a4d3ecd680ad4c4e85cee23f1ed7dc02fc4fe314091a6e88a39523a1b214451'],
      chainId: 1337
    }
  }
};
