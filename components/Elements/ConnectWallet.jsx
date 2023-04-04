import web3 from "web3";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setWalletAddress(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Button onPress={connectWallet}>Connect {walletAddress}</Button>
    </>
  );
};

export default ConnectWallet;
