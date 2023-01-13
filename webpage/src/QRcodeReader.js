import React, { useState } from 'react'
// import QrcodeDecoder from 'qrcode-decoder'
import QrScanner from 'qr-scanner'

const QRcodeReader = ({ setScanResult }) => {
  const handleFileChange = (event) => {
    const { target } = event
    const { files } = target

    if (files && files[0]) {
      const reader = new FileReader()
      //  reader.onloadstart = () => this.setState({loading: true});
      reader.onload = async (event) => {
        try {
          QrScanner.scanImage(event.target.result).then((result) => {
            // alert(result)
            setScanResult(JSON.parse(result).address)
          })
        } catch (err) {
          console.log(err)
        }
      }
      reader.readAsDataURL(files[0])
    }
  }
  return (
    <input id="img" type="file" accept="image/*" onChange={handleFileChange} />
  )
}

export default QRcodeReader
