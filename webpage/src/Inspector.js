import React, { useState, useEffect } from 'react'
import {
  connect,
  //   viewBatch,
  getListOfItemsToInspect,
  batchInfoToJsonString,
  InputField,
  viewBatch,
  formatNumber,
} from './BatchReceiver'
import { insApi, batchApi, ins } from './contractInfos'
import { ethers } from 'ethers'

const inspect = async (
  address,
  energy,
  protein,
  carbohydrate,
  totalSugar,
  fat,
  saturatedFat,
  natri,
  productionDate,
  expiryDate,
) => {
  try {
    if (!typeof window.etherum) throw new Error('No metamask found')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(ins, insApi, signer)
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    const inspectDate = dd + '-' + mm + '-' + yyyy
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

const Inspector = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [batchesToInspect, setBatchesToInspect] = useState([])
  const [selectedBatch, setSelectedBatch] = useState([])
  const [currentBatch, setCurrentBatch] = useState()
  const [inspectInfo, setInspectInfo] = useState({
    energy: 0,
    protein: 0,
    carbohydrate: 0,
    totalSugar: 0,
    fat: 0,
    satFat: 0,
    natri: 0,
    productionDate: 'Not defined',
    expiryDate: 'Not defined',
    inspectedDate: 'Not defined',
  })
  const [inspectedBatches, setInspectedBatches] = useState([])
  const [selectedInspected, setSelectedInspected] = useState({})
  const [currentInspectedBatch, setCurrentInspectedBatch] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      if (isConnected && isLoading) {
        const resp =
          (await getListOfItemsToInspect(setBatchesToInspect)) &&
          (await getAllInspectedBatches(setInspectedBatches))
        if (resp) {
          setIsLoading(false)
        }
      }
    }
    fetchData()
  }, [isLoading, isConnected])
  useEffect(() => {
    if (!batchesToInspect.length) return
    if (!batchesToInspect[selectedBatch]) return
    viewBatch(batchesToInspect[selectedBatch], setCurrentBatch, 0)
  }, [batchesToInspect, selectedBatch])
  useEffect(() => {
    if (!inspectedBatches.length) return
    if (!inspectedBatches[selectedInspected]) return
    viewBatch(inspectedBatches[selectedInspected], setCurrentInspectedBatch, 1)
  }, [inspectedBatches, selectedInspected])
  const handleClickConnect = async () => {
    const resp = await connect()
    if (resp) setIsConnected(true)
  }
  const handleInspect = async () => {
    const resp = await inspect(
      batchesToInspect[selectedBatch],
      ...Object.values(inspectInfo),
    )
    if (resp) alert('Success')
  }
  if (!isConnected)
    return (
      <div>
        <h1>Please first connect to metamask</h1>
        <button onClick={() => handleClickConnect()}>Connect</button>
      </div>
    )
  if (isLoading) return <div className="">Loading list of batches</div>
  return (
    <div className="inspector">
      <div className="batches">
        <h1>Batches to inspect</h1>
        {batchesToInspect.length &&
          batchesToInspect.map((n, index) => (
            <div key={index} onClick={() => setSelectedBatch(index)}>
              {n}
            </div>
          ))}
      </div>
      {currentBatch && (
        <div className="supplied-stat">
          <h1>Stat provided by the supplier</h1>
          {Object.entries(currentBatch).map((n, index) => {
            return (
              <div key={index} className="batch-single-value">
                {n[0]} : {n[1]}
              </div>
            )
          })}
        </div>
      )}
      <div className="inspected-stat">
        <h1>Stats from inspectation</h1>
        {Object.keys(inspectInfo).map((n, index) => (
          <InputField
            key={index}
            label={n}
            state={inspectInfo}
            setState={setInspectInfo}
            property={n}
          />
        ))}
      </div>
      <button onClick={() => handleInspect()}>Inspect</button>
      <div className="batches">
        <h1>Inspected batches</h1>
        {inspectedBatches.length &&
          inspectedBatches.map((n, index) => (
            <div key={index} onClick={() => setSelectedInspected(index)}>
              {n}
            </div>
          ))}
      </div>
      {currentInspectedBatch && (
        <div className="supplied-stat">
          <h1>Inspected stats</h1>
          {Object.entries(currentInspectedBatch).map((n, index) => {
            return (
              <div key={index} className="batch-single-value">
                {n[0]} : {n[1]}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Inspector
