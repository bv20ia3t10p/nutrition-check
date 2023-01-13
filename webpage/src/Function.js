import { ethers } from 'ethers'
import { insApi, batchApi, ins } from './contractInfos'

export const getAllInspectedBatches = async (setInspectedBatches) => {
  try {
    if (!typeof window.ethereum) throw new Error('Please install metamask')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    const batches = await contract.getAllInspectedBatches()
    setInspectedBatches(batches)
    return true
  } catch (e) {
    alert(e)
  }
}

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
export const sysDatetoString = () => {
  const today = new Date()
  const dd = String(today.getDate())
  const mm = String(today.getMonth() + 1) //January is 0!
  const yyyy = today.getFullYear()
  const inspectDate = mm + '-' + dd + '-' + yyyy

  return inspectDate
}
export const addBatch = async (
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

export const ItemSingleInfo = ({ info }) => {
  return (
    <div className="item">
      {Object.entries(info).map((n, index) => {
        return (
          <div key={index}>
            {n[0]} : {n[1]}
          </div>
        )
      })}
    </div>
  )
}

export const InputField = ({
  disable,
  placeholder,
  label,
  state,
  setState,
  property,
}) => {
  return (
    <div className="input-field">
      <div className="name-space">{label}: </div>
      <input
        disabled={disable}
        placeholder={placeholder}
        type="text"
        value={state[`${property}`]}
        onChange={(e) =>
          setState({ ...state, [`${property}`]: e.target.value })
        }
      />
    </div>
  )
}

export const ConnectPage = ({ setIsConnected }) => {
  const handleClickConnect = async () => {
    const resp = await connect()
    console.log(resp)
    if (resp) setIsConnected(true)
  }
  return (
    <div className="Connect">
      <h1>Hello, please connect your metamask wallet</h1>
      <button onClick={async () => await handleClickConnect()}>
        Connect metamask
      </button>
    </div>
  )
}

export const inspect = async (
  address,
  energy = 0,
  protein = 0,
  carbohydrate = 0,
  totalSugar = 0,
  fat = 0,
  saturatedFat = 0,
  natri = 0,
  productionDate = '01-01-2001',
  expiryDate = '01-01-2001',
) => {
  try {
    if (!typeof window.etherum) throw new Error('No metamask found')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    const inspectDate = sysDatetoString()
    await contract.inspect(
      address,
      formatNumber(energy),
      formatNumber(protein),
      formatNumber(carbohydrate),
      formatNumber(totalSugar),
      formatNumber(fat),
      formatNumber(saturatedFat),
      formatNumber(natri),
      productionDate,
      expiryDate,
      inspectDate,
    )
    return true
  } catch (e) {
    alert(e.data.message)
  }
}

export const getStatChecks = async (address, setOutputData) => {
  try {
    if (!typeof window.ethereum) throw new Error('Please install metamask')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, batchApi, signer)
    const basicInfo = await contract.getStat(1)
    const output = await contract.getStatChecks()
    setOutputData({
      ...JSON.parse(
        batchInfoToJsonString([
          basicInfo.name,
          ...output,
          basicInfo.inspectedDate,
        ]),
      ),
      address,
    })
  } catch (e) {
    alert(e)
  }
}
