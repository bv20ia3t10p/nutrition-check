import { insApi, batchApi, ins } from "./contractInfos";
import { useState } from 'react'
import { ethers } from 'ethers'

const connect = async () => {
  if (typeof window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
  } else {
    alert('Metamask not found')
  }
}

const addBatch = async () => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    try {
      await contract.addBatch("Milk", 10, 20, 30, 40, 50, 60, 70, '20-03-2002', '20-03-2100')
    } catch (error) {
      console.log(error)
    }
  }
}
const viewBatch = async () => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    try {
      const batchAddress = await contract.getBatchAtIndex(0);
      const provider2 = new ethers.providers.Web3Provider(window.ethereum)
      const contract2 = new ethers.Contract(batchAddress, batchApi, signer)
      const resp = await contract2.getStat(1);
      console.log(resp);
    } catch (error) {
      console.log(error)
    }
  }
}

function App() {
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
          <button onClick={() => viewBatch()}>View batch</button>
        </div>
      </header>
    </div>
  );
}

export default App;