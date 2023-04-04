import { LayOut, TableView, WebCryptoSocket } from "@/components";
import { symbolTop, symbols } from "@/hooks";
import { StatGroup } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <LayOut>
      <main className="p-4">
        {/* <ConnectWallet /> */}
        <StatGroup>
          {symbolTop.map((i) => (
            <WebCryptoSocket
              key={i}
              wssUrl={`wss://api.bitkub.com/websocket-api/market.ticker.thb_${i}`}
            />
          ))}
        </StatGroup>
        <>
          <TableView symbols={symbols} />
        </>
      </main>
    </LayOut>
  );
};

export default HomePage;
