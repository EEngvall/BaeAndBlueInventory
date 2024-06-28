import React, { useRef } from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ url }) => {
  const qrRef = useRef();

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const printQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const dataUrl = canvas.toDataURL("image/png");
    let windowContent = "<!DOCTYPE html>";
    windowContent += "<html>";
    windowContent += "<head><title>Print QR Code</title></head>";
    windowContent += "<body>";
    windowContent += `<img src="${dataUrl}">`;
    windowContent += "</body>";
    windowContent += "</html>";
    const printWin = window.open("", "", "width=340,height=260");
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  };

  return (
    <div className="text-center" ref={qrRef}>
      <QRCode value={url} size={128} />
      <div>
        <button className="btn btn-success btn-sm" onClick={downloadQR}>
          Download
        </button>
        {/* <button onClick={printQR}>Print</button> */}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
