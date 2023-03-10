import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  ConnectPage,
  getListOfItemsToInspect,
  InputField,
  addBatch,
  viewBatch,
} from './Function'
import canvasToImage from 'canvas-to-image'

function BatchReceiver() {
  const [currentBatch, setCurrentBatch] = useState({ name: '' })
  const [qrValue, setQrValue] = useState()
  const [batchesToInspect, setBatchesToInspect] = useState([])
  const [, setSelectedBatch] = useState(0)
  const [isViewingBatchInfo, setIsViewingBatchInfo] = useState(false)
  // const [inspectedBatches, setInspectedBatches] = useState([])
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
        {Object.keys(batchToAdd).map((n, index) =>
          index < 8 ? (
            <InputField
              type={'text'}
              placeholder={0}
              key={index}
              label={n}
              state={batchToAdd}
              setState={setBatchToAdd}
              property={n}
            />
          ) : (
            <InputField
              type={'date'}
              placeholder={'Not specified'}
              key={index}
              label={n}
              state={batchToAdd}
              setState={setBatchToAdd}
              property={n}
            />
          ),
        )}
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

        <div className="view-batch">
          <button
            onClick={() => {
              getListOfItemsToInspect(setBatchesToInspect)
              setIsViewingBatchInfo(true)
            }}
          >
            View batches
          </button>
        </div>
        {isViewingBatchInfo && (
          <div className="qr-code">
            <div className="batches">
              {batchesToInspect.length !== 0 && (
                <div className="uninspected">
                  {batchesToInspect.map((n, index) => (
                    <div
                      onClick={async () => {
                        setSelectedBatch(index)
                        await viewBatch(
                          batchesToInspect[index],
                          setCurrentBatch,
                          0,
                        )
                        setQrValue(batchesToInspect[index])
                      }}
                      key={index}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {currentBatch.name && (
              <>
                <QRCodeCanvas
                  size={500}
                  id="qrCodeReceiver"
                  value={JSON.stringify({ ...currentBatch, address: qrValue })}
                />
                <button
                  onClick={() =>
                    canvasToImage(document.getElementById('qrCodeReceiver'), {
                      name: 'addedItemQR',
                      type: 'jpg',
                      quality: 2,
                    })
                  }
                >
                  Download
                </button>
              </>
            )}
            <button onClick={() => setIsViewingBatchInfo(false)}>Close</button>
          </div>
        )}
      </header>
    </div>
  )
}

export default BatchReceiver
