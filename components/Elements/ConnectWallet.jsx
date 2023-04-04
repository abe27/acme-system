import web3 from "web3";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

const ConnectWallet = () => {
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const [walletAddress, setWalletAddress] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    console.log(`Wallet connect: ${isConnected}`);
    console.log(`Wallet name: ${ensName}`);
  }, [isConnected]);

  if (!hasMounted) return null;

  return (
    <>
      {isConnected ? (
        <div>
          <Button auto>Connect {address}</Button>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}

          {error && <div>{error.message}</div>}
          <p>{ensAvatar}</p>
        </div>
      ) : null}
    </>
  );
};

export default ConnectWallet;
