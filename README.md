# Nutrition check webpage applying blockchain technology
## Running the project
### Prerequisties
+ Nodejs preferably latest version as of Jan 2023
### Deployment
#### Hardhat.config.js
##### Goerli
+ There's currently a living burner account holding around 0.18 Goerli ETH.
##### Ganache
###### Modify the property ganache of network in module.exports object to the following
+ url: 'Ganache RPC Server'
+ chainId: 'Ganache network ID'
+ acccounts: ['Any private key from the account list generated by ganache']
#### Directory
+ (command) Move to the project folder ( e.g: cd "/d/nutrition-check/" )
+ npm install
#### *Unnecessary unless changes to either .sol files are made*
+ (command) npm hardhat compile
+ Navigate to newly created artifacts ('nutrition-check/artifacts/') folder created by hardhat, look into folders containing '.sol' in their names, open the respective .json file (without .dbg extension), take the ABI and paste it into respective variables in 'nutrition-check/webpage/src/contractInfo.js'
#### Deploying contract (Select one from two of the following)
+ ganache: (command) npm hardhat run scripts/deploy.js --network ganache
+ goerli: (command) npm hardhat run scripts/deploy.js --network goerli
#### Modifying 'nutrition-check/webpage/src/contractInfo.js'
+ Replace the value of the 'ins' variable in the file with newly returned address in the console
#### Deploying the webpage
+ (command) Move to the webpage folder (e.g: cd "/d/nutrition-check/webpage")
+ npm install
+ npm start
#### Metamask config
##### Ganache
+ See https://dapp-world.com/blogs/01/how-to-connect-ganache-with-metamask-and-deploy-smart-contracts-on-remix-without-1619847868947
##### Goerli
+ If Goerli testnet is still up, the given account in hardhat.config.js would still work, simply take the private key and import to your metamask wallet
## Application flow
### Procedures
+ Receive a product at batch receiver -> Create the item ( as a smart contract ) and store the address in the Inspector contract
+ Inspector select the address to conduct the inspectation for and input actual values from inspectation
+ Customer enter the item address to retrieve inspectation information. This can be done by extracting address from the QR code result by either manually scan it outside or upload the image to the webpage
### QR
+ At the end of inspectation or receiving procedure, QR code of an item can easily be generated by simply clicking on the item address
