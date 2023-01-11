import { insApi, batchApi, ins } from './contractInfos'
import { useState } from 'react'
import { ethers } from 'ethers'
import { QRCodeSVG } from 'qrcode.react'

// Connect with metamask
const connect = async () => {
  if (typeof window.ethereum) {
    window.ethereum.request({ method: 'eth_requestAccounts' })
  } else {
    alert('Metamask not found')
  }
}

// Get all batches to inspect
const getListOfItemsToInspect = async (setBatchesToInspect) => {
  try {
    if (!typeof window.ethereum) throw new Error('Please install metamask')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    const batches = await contract.getAllBatchesToInspect()
    setBatchesToInspect(batches)
  } catch (e) {
    alert(e)
  }
}

//To put floating point values onto the blockchain
const formatNumber = (n) => ethers.utils.parseEther(`${n}`)

const addBatch = async (
  name,
  energy,
  protein,
  carbohydrate,
  totalSugar,
  fat,
  saturatedFat,
  natri,
  productionDate, // String dd-mm-yyyy
  expiryDate, // String dd-mm-yyyy
) => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    try {
      await contract.addBatch(
        name,
        formatNumber(energy),
        formatNumber(protein),
        formatNumber(carbohydrate),
        formatNumber(totalSugar),
        formatNumber(fat),
        formatNumber(saturatedFat),
        formatNumber(natri),
        productionDate,
        expiryDate,
      )
    } catch (error) {
      console.log(error)
    }
  }
}
const viewBatch = async (address, setCurrentBatch) => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    try {
      const contract2 = new ethers.Contract(address, batchApi, signer)
      const resp = await contract2.getStat(0)
      const formattedData = resp.map((n) => {
        if (n._isBigNumber) {
          return ethers.utils.formatEther(n)
        }
        return n
      })
      console.log(resp)
      console.log(formattedData)
      setCurrentBatch(formattedData)
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
  const [batchesToInspect, setBatchesToInspect] = useState([])
  const [selectedBatch, setSelectedBatch] = useState(0)
  const [inspectedBatches, setInspectedBatches] = useState([])
  const [batchToAdd, setBatchToAdd] = useState({
    name: '',
    energy: 0,
    protein: 0,
    carbohydrate: 0,
    totalSugar: 0,
    fat: 0,
    saturatedFat: 0,
    natri: 0,
    productionDate: 'Not specified',
    expiryDate: 'Not specified',
  })
  return (
    <div className="App">
      <header className="App-header">
        <div className="connect-wallet">
          <button onClick={() => connect()}>Connect</button>
        </div>
        <div>
          <button onClick={() => getListOfItemsToInspect(setBatchesToInspect)}>
            View batches
          </button>
        </div>
        <div className="qr-code">
          <QRCodeSVG value={batchInfoToJsonString(currentBatch)} />
        </div>
        {Object.keys(batchToAdd).map((n, index) => (
          <InputField
            key={index}
            label={n}
            state={batchToAdd}
            setState={setBatchToAdd}
            property={n}
          />
        ))}
        <div className="create-batch">
          <button onClick={() => addBatch(...Object.values(batchToAdd))}>
            Create batch
          </button>
        </div>
        <div className="batches">
          {batchesToInspect.length && (
            <div className="uninspected">
              {batchesToInspect.map((n, index) => (
                <div
                  onClick={() => {
                    setSelectedBatch(index)
                    viewBatch(batchesToInspect[index], setCurrentBatch)
                  }}
                  key={index}
                >
                  {n}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

const InputField = ({ label, state, setState, property }) => {
  return (
    <div className="input-field">
      <span>{label}: </span>
      <input
        type="text"
        value={state[`${property}`]}
        onChange={(e) =>
          setState({ ...state, [`${property}`]: e.target.value })
        }
      />
    </div>
  )
}

export default App
