require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      accounts: ['0xf076b77a1daeae7237ed854b808dca923dc5563aef9b6c44316b36c31b55b94c'],
      chainId: 1337
    }
  }
};
