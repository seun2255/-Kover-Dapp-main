import React from "react";

export interface QRProps {
  className?: string;
  size?: string;
}

function QRConnector(props: QRProps) {
  const { className, size } = props;
  return (
    <div className={className}>
      <b className="font-normal block mb-[15px] qr-title">Want to continue with Smartphone ?</b>
      <div
        className={`p-4 flex justify-center items-center dark:box-border dark-light-box-border ${size}`}
        style={{ aspectRatio: "1/1" }}>
        <img src="/images/Group 217.svg" alt="" />
      </div>
    </div >
  );
}

export default QRConnector;
