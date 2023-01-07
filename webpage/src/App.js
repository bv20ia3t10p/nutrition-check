import { insApi, batchApi, ins } from "./contractInfos";
import { useState } from 'react'
import { ethers } from 'ethers'
import { QRCodeSVG } from 'qrcode.react';

const connect = async () => {
  if (typeof window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
  } else {
    alert('Metamask not found')
  }
}

//To put floating point values onto the blockchain
const formatNumber = (n) => ethers.utils.parseEther(n);

const addBatch = async () => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    try {
      await contract.addBatch("Milk",
        formatNumber('10'), formatNumber('20'),
        formatNumber('30'), formatNumber('40'),
        formatNumber('50'), formatNumber('60'),
        formatNumber('70'), '20-03-2002', '20-03-2100')
    } catch (error) {
      console.log(error)
    }
  }
}
const viewBatch = async (setCurrentBatch) => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    try {
      const batchAddress = await contract.getBatchAtIndex(1);
      const contract2 = new ethers.Contract(batchAddress, batchApi, signer)
      const resp = await contract2.getStat(0);
      const formattedData = resp.map((n) => {
        if (n._isBigNumber) {
          return ethers.utils.formatEther(n)
        }
        return n;
      })
      console.log(resp);
      console.log(formattedData);
      setCurrentBatch(formattedData);
    } catch (error) {
      console.log(error)
    }
  }
}

const batchInfoToJsonString = (batchInfo) =>
  `{"energy":"${batchInfo[0]}",
  "protein":"${batchInfo[1]}",
  "carbohydrate":"${batchInfo[2]}",
  "totalSugar":"${batchInfo[3]}",
  "fat":"${batchInfo[4]}",
  "saturatedFat":"${batchInfo[5]}",
  "natri":"${batchInfo[6]}",
  "productionDate":"${batchInfo[7]}",
  "expiryDate":"${batchInfo[8]}",
  "inspectedDate":"${batchInfo[9]}"}`

function App() {
  const [currentBatch, setCurrentBatch] = useState([])
  return (
    <div className="App">
      <header className="App-header">
        <div className="connect-wallet">
          <button onClick={() => connect()}>Connect</button>
        </div>
        <div className="create-batch">
          <button onClick={() => addBatch()}>Create batch</button>
        </div>
        <div className="view-batch">
          <button onClick={() => viewBatch(setCurrentBatch)}>View batch</button>
        </div>
        <div className="qr-code">
          <button>Generate QR</button>
          <QRCodeSVG value={batchInfoToJsonString(currentBatch)} />
        </div>
      </header>
    </div>
  );
}

export default App;