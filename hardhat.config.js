require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: ['91221cb656995f7466879fe67d889a0619b029609e483c94362c4521a8240c61'],
      chainId: 1337
    }
  }
};
