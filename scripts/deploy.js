const { ethers } = require('hardhat')

async function main() {
  const inspectFactory = await ethers.getContractFactory('Inspector')
  console.log('Deploying contract')
  const inspect = await inspectFactory.deploy()
  await inspect.deployed()
  console.log(`Deployed to: ${inspect.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

