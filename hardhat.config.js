require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      accounts: ['a08ee07b9579eb8fd8e3a739d0308a0d9e61bb70a87c883d3efcd09ef0f74275'],
      chainId: 1337
    },
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      chainId: 5,
      accounts: ['9293a4bf706c7971da58318470aff4fc2b099538c63e145593d73c7c33624925']
    },
  }
};
