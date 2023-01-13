import React, { useState, useEffect } from "react";
import {
  inspect,
  //   viewBatch,
  getListOfItemsToInspect,
  getAllInspectedBatches,
  InputField,
  viewBatch,
  getStatChecks,
  ConnectPage,
  sysDatetoString,
} from "./Function";
import canvasToImage from "canvas-to-image";
import { QRCodeCanvas } from "qrcode.react";

const Inspector = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [batchesToInspect, setBatchesToInspect] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [currentBatch, setCurrentBatch] = useState();
  // const [isChangedColor, setIsChangedColor] = useState(false)
  const [inspectInfo, setInspectInfo] = useState({
    energy: "",
    protein: "",
    carbohydrate: "",
    totalSugar: "",
    fat: "",
    satFat: "",
    natri: "",
    productionDate: "",
    expiryDate: "",
    inspectedDate: "",
  });
  const [inspectedBatches, setInspectedBatches] = useState([]);
  const [selectedInspected, setSelectedInspected] = useState({});
  const [currentInspectedBatch, setCurrentInspectedBatch] = useState({});
  const [outputData, setOutputData] = useState({
    energy: "",
    protein: "",
    carbohydrate: "",
    totalSugar: "",
    fat: "",
    satFat: "",
    natri: "",
    productionDate: "",
    expiryDate: "",
    inspectedDate: "",
  });

  useEffect(() => {
    if (!isConnected) return;
    const fetchData = async () => {
      if (isConnected && isLoading) {
        const resp =
          (await getListOfItemsToInspect(setBatchesToInspect)) &&
          (await getAllInspectedBatches(setInspectedBatches));
        if (resp) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [isLoading, isConnected]);
  useEffect(() => {
    if (!isConnected) return;
    if (!batchesToInspect.length) return;
    if (!batchesToInspect[selectedBatch]) return;
    viewBatch(batchesToInspect[selectedBatch], setCurrentBatch, 0);
  }, [isConnected, batchesToInspect, selectedBatch]);
  useEffect(() => {
    if (!isConnected) return;
    if (!inspectedBatches.length) return;
    if (!inspectedBatches[selectedInspected]) return;
    viewBatch(inspectedBatches[selectedInspected], setCurrentInspectedBatch, 1);
    getStatChecks(inspectedBatches[selectedInspected], setOutputData);
  }, [isConnected, inspectedBatches, selectedInspected]);
  const handleInspect = async () => {
    const resp = await inspect(
      batchesToInspect[selectedBatch],
      ...Object.values(inspectInfo)
    );
    if (resp) alert("Success");
  };
  if (!isConnected) return <ConnectPage setIsConnected={setIsConnected} />;
  if (isLoading) return <div className="">Loading list of batches</div>;
  return (
    <div className="inspector">
      {/* <button
        onClick={() => setIsChangedColor(!isChangedColor)}
        className={`${isChangedColor ? 'green-btn' : 'blue-button'}`}
      >
        Button
      </button> */}
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
            );
          })}
        </div>
      )}
      <div className="inspected-stat">
        <h1>Stats from inspectation</h1>
        {/* <InputField
          label="Product name"
          state={inspectInfo}
          setState={setInspectInfo}
          property={inspectInfo.name}
        /> */}
        {Object.keys(inspectInfo).map((n, index) => {
          if (index < 7) {
            return (
              <InputField
                placeholder="0"
                key={index}
                label={n}
                state={inspectInfo}
                setState={setInspectInfo}
                property={n}
              />
            );
          }
          if (index === 9)
            return (
              <InputField
                disable={true}
                placeholder={sysDatetoString()}
                key={index}
                label="inspectedDate"
                state={inspectInfo}
                setState={setInspectInfo}
                property={"inspectedDate"}
              />
            );
        })}
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
            console.log(Object.entries(currentInspectedBatch));
            return (
              <div key={index} className="batch-single-value">
                {n[0]} : {n[1]}{" "}
                {index < 8 && index > 0 ? (
                  <span> {`${outputData[`${n[0]}`]}`} </span>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      )}
      {outputData && (
        <div className="output">
          <QRCodeCanvas
            // includeMargin={true}
            id="qrcode"
            value={JSON.stringify(outputData)}
            // level="H"
            size={300}
          />
        </div>
      )}
      <button
        onClick={() =>
          canvasToImage(document.getElementById("qrcode"), {
            name: "inspectedItemQR",
            type: "jpg",
            quality: 2,
          })
        }
      >
        Download
      </button>
    </div>
  );
};

export default Inspector;
