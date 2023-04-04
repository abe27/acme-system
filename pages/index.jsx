import { LayOut, WebCryptoSocket } from "@/components";
import { StatGroup } from "@chakra-ui/react";

const symbol = ["btc", "eth", "bnb", "xrp", "kub", "avax"];

const HomePage = () => {
  return (
    <LayOut>
      <main className="p-4">
        {/* <ConnectWallet /> */}
        <StatGroup>
          {symbol.map((i) => (
            <div key={i} className="shadow bg-white p-4 rounded w-52">
              <WebCryptoSocket
                wssUrl={`wss://api.bitkub.com/websocket-api/market.ticker.thb_${i}`}
              />
            </div>
          ))}
        </StatGroup>
      </main>
    </LayOut>
  );
};

export default HomePage;
