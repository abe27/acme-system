/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";

const SymbolTableBody = ({ symbol }) => {
  const [data, setData] = useState({});
  const handleData = (e) => {
    const d = new Date();
    try {
      const json = JSON.parse(e.data);
      json.lastUpdate = `${("0" + d.getDate()).slice(-2)}/${(
        "0" +
        (d.getMonth() + 1)
      ).slice(-2)}/${d.getFullYear()} ${("0" + d.getHours()).slice(-2)}:${(
        "0" + d.getMinutes()
      ).slice(-2)}:${("0" + d.getSeconds()).slice(-2)}`;
      console.dir(json);
      setData(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const ws = new WebSocket(
      `wss://api.bitkub.com/websocket-api/market.ticker.thb_${symbol.toLowerCase()}`
    );

    ws.onmessage = (e) => handleData(e);
  }, []);

  return (
    <>
      {data?.last ? (
        <Tr>
          <Td>
            <Avatar.Group>
              <Avatar
                size="lg"
                pointer
                src={"/symbol/th.webp"}
                text={"TH"}
                stacked
              />
              <Avatar
                size="lg"
                pointer
                src={`/symbol/${symbol}.png`}
                text={symbol}
                stacked
              />
            </Avatar.Group>
          </Td>
          <Td>{symbol}</Td>
          <Td isNumeric>{data.last}</Td>
          <Td isNumeric>{data.highestBid}</Td>
          <Td isNumeric>{data.lowestAsk}</Td>
          <Td isNumeric>{data.percentChange}</Td>
          <Td>
            <div className="flex w-full justify-end">{data.lastUpdate}</div>
          </Td>
        </Tr>
      ) : null}
    </>
  );
};

const TableView = ({ symbols = [] }) => {
  return (
    <div className="p-4 mt-4">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>ชื่อ</Th>
              <Th isNumeric>ราคาล่าสุด</Th>
              <Th isNumeric>ต้องการซื้อ</Th>
              <Th isNumeric>ต้องการขาย</Th>
              <Th isNumeric>การเปลี่ยนแปลง(%)</Th>
              <Th isNumeric>อัพเดทล่าสุด</Th>
            </Tr>
          </Thead>
          <Tbody>
            {symbols.map((i) => (
              <SymbolTableBody key={i} symbol={i} />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>ชื่อ</Th>
              <Th isNumeric>ราคาล่าสุด</Th>
              <Th isNumeric>ต้องการซื้อ</Th>
              <Th isNumeric>ต้องการขาย</Th>
              <Th isNumeric>การเปลี่ยนแปลง(%)</Th>
              <Th isNumeric>อัพเดทล่าสุด</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableView;
