require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [
        'ef128fcded16d948f6e3acbc7ece923359376967b52664af36b69923bcc0d6ac',
      ],
      chainId: 1337,
    },
  },
}
