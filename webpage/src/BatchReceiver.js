import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  ConnectPage,
  getListOfItemsToInspect,
  InputField,
  addBatch,
  viewBatch,
} from './Function'

function BatchReceiver() {
  const [currentBatch, setCurrentBatch] = useState()
  const [batchesToInspect, setBatchesToInspect] = useState([])
  const [selectedBatch, setSelectedBatch] = useState(0)
  const [inspectedBatches, setInspectedBatches] = useState([])
  const [isConnected, setIsConnected] = useState(false)
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
  if (!isConnected) return <ConnectPage setIsConnected={setIsConnected} />
  return (
    <div className="App">
      <header className="App-header">
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

export default BatchReceiver
