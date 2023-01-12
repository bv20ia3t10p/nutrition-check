require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [
        '3ee13397c3df54e1d0f8e0f46260594d15475863c74d244e27feefc627185911',
      ],
      chainId: 1337,
    },
  },
}
