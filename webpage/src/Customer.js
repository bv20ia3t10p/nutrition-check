import React, { useState } from 'react'
import { connect, viewBatch } from './BatchReceiver'
import { getStatChecks } from './Inspector'

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

const Customer = () => {
  const [addressInput, setAddressInput] = useState('')
  const [suppliedStat, setSuppliedStat] = useState()
  const [inspectedStat, setInspectedStat] = useState()
  const [statChecks, setStatChecks] = useState()
  const [isConnected, setIsConnected] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const _suppliedStat = viewBatch(addressInput, setSuppliedStat, 0)
      const _inspectedStat = viewBatch(addressInput, setInspectedStat, 1)
      const _checks = getStatChecks(addressInput, setStatChecks)
      if (!_suppliedStat) throw new Error('Item not found')
      setSuppliedStat(_suppliedStat)
      if (!_inspectedStat) throw new Error('Item not inspected')
      setInspectedStat(_inspectedStat)
      setStatChecks(_checks)
    } catch (e) {
      alert(e)
    }
  }
  if (!isConnected) return <ConnectPage setIsConnected={setIsConnected} />
  return (
    <div>
      <h1>Hello customer</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="addressInput">Enter product address</label>
        <input
          type="text"
          id="addressInput"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {suppliedStat && <ItemSingleInfo info={suppliedStat} />}
      {inspectedStat && <ItemSingleInfo info={inspectedStat} />}
      {statChecks && <ItemSingleInfo info={statChecks} />}
    </div>
  )
}

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

export default Customer
