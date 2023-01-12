import { insApi, batchApi, ins } from './contractInfos'
import { useState } from 'react'
import { ethers } from 'ethers'
import { QRCodeSVG } from 'qrcode.react'

// Connect with metamask
export const connect = async () => {
  try {
    if (!typeof window.ethereum) throw new Error('No metamask found')
    window.ethereum.request({ method: 'eth_requestAccounts' })
    return true
  } catch (e) {
    alert(e)
  }
}

// Get all batches to inspect
export const getListOfItemsToInspect = async (setBatchesToInspect) => {
  try {
    if (!typeof window.ethereum) throw new Error('Please install metamask')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    const batches = await contract.getAllBatchesToInspect()
    setBatchesToInspect(batches)
    return true
  } catch (e) {
    alert(e)
  }
}

//To put floating point values onto the blockchain
export const formatNumber = (n) => ethers.utils.parseEther(`${n}`)

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

// type 0 -> Supplied stats
// type 1 -> Inspected stats

export const viewBatch = async (address, setCurrentBatch, type) => {
  if (typeof window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    try {
      const contract2 = new ethers.Contract(address, batchApi, signer)
      const resp = await contract2.getStat(type)
      const formattedData = resp.map((n) => {
        if (n._isBigNumber) {
          return ethers.utils.formatEther(n)
        }
        return n
      })
      setCurrentBatch(JSON.parse(batchInfoToJsonString(formattedData)))
    } catch (e) {
      alert(e)
    }
  }
}

export const batchInfoToJsonString = (batchInfo) =>
  `{"name":"${batchInfo[0]}",
  "energy":"${batchInfo[1]}",
  "protein":"${batchInfo[2]}",
  "carbohydrate":"${batchInfo[3]}",
  "totalSugar":"${batchInfo[4]}",
  "fat":"${batchInfo[5]}",
  "saturatedFat":"${batchInfo[6]}",
  "natri":"${batchInfo[7]}",
  "productionDate":"${batchInfo[8]}",
  "expiryDate":"${batchInfo[9]}",
  "inspectedDate":"${batchInfo[10]}"}`

function BatchReceiver() {
  const [currentBatch, setCurrentBatch] = useState()
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
          <QRCodeSVG value={currentBatch} />
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
                  onClick={async () => {
                    setSelectedBatch(index)
                    await viewBatch(batchesToInspect[index], setCurrentBatch, 0)
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

export const InputField = ({ label, state, setState, property }) => {
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

export default BatchReceiver
