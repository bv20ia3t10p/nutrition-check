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
    energy: '',
    protein: '',
    carbohydrate: '',
    totalSugar: '',
    fat: '',
    saturatedFat: '',
    natri: '',
    productionDate: '',
    expiryDate: '',
  })
  if (!isConnected) return <ConnectPage setIsConnected={setIsConnected} />
  return (
    <div className="App">
    <div className="rolename">Manager</div>
      <header className="App-header">
        {Object.keys(batchToAdd).map((n, index) => (
          (index<8)?(<InputField
            placeholder={0}
            key={index}
            label={n}
            state={batchToAdd}
            setState={setBatchToAdd}
            property={n}
          />):(<InputField
            placeholder={"Not specified"}
            key={index}
            label={n}
            state={batchToAdd}
            setState={setBatchToAdd}
            property={n}
          />)
          
        ))}
        <div className="create-batch">
          <button onClick={() => addBatch(...Object.values(batchToAdd))}>
            Create batch
          </button>
        </div>
        {/* <div className="batches">
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
        </div> */}

        <div class="view-batch">
          <button onClick={() => getListOfItemsToInspect(setBatchesToInspect)}>
            View batches
          </button>
        </div>
        <div className="qr-code">
        <div className="batches">
          {batchesToInspect.length!==0 && (
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
          {currentBatch && (<QRCodeSVG value={currentBatch} />)}
        </div>

      </header>
    </div>
  )
}

export default BatchReceiver
