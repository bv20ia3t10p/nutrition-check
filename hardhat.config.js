require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      accounts: [
        '92c1e5eb4df4023dae0c105f2e781735cfd2bbded4e904107134b930dbc5793e',
      ],
      chainId: 1337,
    },
  },
}
