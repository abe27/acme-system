import { ConnectWallet, LayOut, WebCryptoSocket } from "@/components";

const HomePage = () => {
  return (
    <LayOut>
      <main className="p-4">
        <ConnectWallet />
        <WebCryptoSocket wssUrl="wss://api.bitkub.com/websocket-api/market.ticker.thb_bnb" />
        <WebCryptoSocket wssUrl="wss://api.bitkub.com/websocket-api/market.ticker.thb_btc" />
        <WebCryptoSocket wssUrl="wss://api.bitkub.com/websocket-api/market.ticker.thb_eth" />
      </main>
    </LayOut>
  );
};

export default HomePage;
