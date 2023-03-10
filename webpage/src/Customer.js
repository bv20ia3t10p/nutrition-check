import React, { useState } from "react";
import {
  ItemSingleInfo,
  viewBatch,
  getStatChecks,
  ConnectPage,
} from "./Function";
import QRcodeReader from "./QRcodeReader";

const Customer = () => {
  const [addressInput, setAddressInput] = useState("");
  // const [scanResult, setScanResult] = useState()
  const [suppliedStat, setSuppliedStat] = useState({
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
  const [inspectedStat, setInspectedStat] = useState({
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
  const [statChecks, setStatChecks] = useState({
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
  const [isConnected, setIsConnected] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const _suppliedStat = viewBatch(addressInput, setSuppliedStat, 0);
      const _inspectedStat = viewBatch(addressInput, setInspectedStat, 1);
      const _checks = getStatChecks(addressInput, setStatChecks);
      if (!_suppliedStat) throw new Error("Item not found");
      setSuppliedStat(_suppliedStat);
      if (!_inspectedStat) throw new Error("Item not inspected");
      setInspectedStat(_inspectedStat);
      setStatChecks(_checks);
    } catch (e) {
      alert(e);
    }
  };
  if (!isConnected) return <ConnectPage setIsConnected={setIsConnected} />;
  return (
    <div className="customer">
      <h1>Hello customer</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="addressInput">Enter product address</label>
        <input
          type="text"
          id="addressInput"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* {suppliedStat && <ItemSingleInfo info={suppliedStat} />}
      {inspectedStat && <ItemSingleInfo info={inspectedStat} />}
      {statChecks && <ItemSingleInfo info={statChecks} />} */}

      {suppliedStat.name && (
        <div className="item">
          {Object.entries(suppliedStat).map((n, index) => {
            if (index === 10) {
              return (
                <div key={index}>
                  <span className="n0">{n[0]}</span>

                  {n[1] === "Not inspected" ? (
                    <> : {n[1]}</>
                  ) : (
                    <> : {inspectedStat.inspectedDate}</>
                  )}
                </div>
              );
            }
            return (
              <div key={index}>
                <span className="n0">{n[0]}</span> :{" "}
                {index < 10 ? <div className="n1">{n[1]}</div> : ""}
                {index < 8 && index > 0 ? (
                  <div>
                    {" "}
                    {inspectedStat.name !== "" && (
                      <>
                        <div className="n3">
                          {`${inspectedStat[`${n[0]}`]}`}{" "}
                        </div>
                        <div
                          className={`${
                            statChecks[`${n[0]}`] === "Alert"
                              ? "n4 Red-check"
                              : "n4 Blue-check"
                          }`}
                        >{`${statChecks[`${n[0]}`]}`}</div>
                      </>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {/* {index === 10 ? <div>{`${inspectedStat[`${n[0]}`]}`}</div> : ""} */}
              </div>
            );
          })}
        </div>
      )}
      <QRcodeReader setScanResult={setAddressInput} />
      {/* {scanResult && (
        <div className="item">
          {Object.entries(scanResult).map((n, index) => {
            return (
              <div>
                {n[0]} : {n[1]}
              </div>
            )
          })}
        </div>
      )} */}
    </div>
  );
};

export default Customer;
