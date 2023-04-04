/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const WebHandle = ({
  wssUrl = "wss://api.bitkub.com/websocket-api/market.ticker.thb_btc",
  handleData = null,
}) => {
  useEffect(() => {
    const ws = new WebSocket(wssUrl);

    ws.onmessage = (e) => handleData(e);
  }, []);

  return <></>;
};

const WebCryptoSocket = ({
  wssUrl = "wss://api.bitkub.com/websocket-api/market.ticker.thb_bnb",
  cost = 1000,
}) => {
  const [data, setData] = useState({});

  const handleData = (e) => {
    try {
      const json = JSON.parse(e.data);
      // console.dir(json);
      setData(json);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <WebHandle wssUrl={wssUrl} handleData={handleData} />
      {data !== null ? (
        <>
          <p className="uppercase">
            {data.stream?.substring(
              "market.ticker.thb_".length,
              data.stream.length
            )}
          </p>
          <p>Price:{data?.last ? data?.last?.toLocaleString() : 0}</p>
          <p>
            Cost:{cost ? cost?.toLocaleString() : 0}:::{cost / data?.last}
          </p>
          <p>Change:{data?.percentChange}%</p>
          <p>
            High:{data?.highestBid?.toLocaleString()} =={" "}
            {data?.high24hr?.toLocaleString()}
          </p>
          <p>
            Low:{data?.lowestAsk?.toLocaleString()} =={" "}
            {data?.low24hr?.toLocaleString()}
          </p>
        </>
      ) : null}
    </>
  );
};
export default WebCryptoSocket;
