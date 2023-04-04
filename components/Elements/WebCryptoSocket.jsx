/* eslint-disable react-hooks/exhaustive-deps */
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
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
          <Stat>
            <StatLabel>
              <span className="uppercase">
                {data.stream?.substring(
                  "market.ticker.thb_".length,
                  data.stream.length
                )}
              </span>
            </StatLabel>
            <StatNumber>
              {data?.last ? data?.last?.toLocaleString() : 0}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={data?.percentChange > 0 ? "increase" : "decrease"}
              />
              {data?.percentChange}%
            </StatHelpText>
          </Stat>
        </>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
    </>
  );
};
export default WebCryptoSocket;
