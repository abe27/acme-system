/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  Input,
  Badge,
  Button,
} from "@nextui-org/react";
import { NotificationIcon } from "@/components/Icons/NotificationIcon";
import { AddNoteIcon } from "@/components/Icons/AddNoteIcon";
import { CopyDocumentIcon } from "@/components/Icons/CopyDocumentIcon";
import { EditDocumentIcon } from "@/components/Icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "@/components/Icons/DeleteDocumentIcon";
import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Connector = () => {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [hasMounted, setHasMounted] = useState(false);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const logOutWallet = async (actionKey) => {
    if (actionKey.actionKey === "logout") {
      disconnect();
    }
  };

  // useEffect(() => {
  //   console.log(`Wallet connect: ${isConnected}`);
  //   if (isConnected !== undefined) {
  //     setIsConnectWallet(isConnected);
  //   }
  // }, []);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // useEffect(() => {

  // }, [isConnected])

  // Render
  if (!hasMounted) return null;

  return (
    <>
      {isConnected ? (
        <>
          <Dropdown
            placement="bottom-right"
            aria-label="Actions"
            css={{ $$dropdownMenuWidth: "280px" }}
          >
            <Navbar.Item>
              <Dropdown.Trigger>
                <Button light color="primary" auto>
                  <Badge
                    color="error"
                    content={5}
                    isInvisible={false}
                    shape="circle"
                  >
                    <NotificationIcon
                      as="button"
                      fill="currentColor"
                      size={30}
                    />
                  </Badge>
                </Button>
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu>
              <Dropdown.Section title="Actions">
                <Dropdown.Item
                  key="new"
                  command="⌘N"
                  description="Create a new file"
                  icon={
                    <AddNoteIcon
                      size={22}
                      fill="var(--nextui-colors-secondary)"
                    />
                  }
                >
                  New file
                </Dropdown.Item>
                <Dropdown.Item
                  key="copy"
                  command="⌘C"
                  description="Copy the file link"
                  icon={
                    <CopyDocumentIcon
                      size={22}
                      fill="var(--nextui-colors-secondary)"
                    />
                  }
                >
                  Copy link
                </Dropdown.Item>
                <Dropdown.Item
                  key="edit"
                  command="⌘⇧E"
                  description="Allows you to edit the file"
                  icon={
                    <EditDocumentIcon
                      size={22}
                      fill="var(--nextui-colors-secondary)"
                    />
                  }
                >
                  Edit file
                </Dropdown.Item>
              </Dropdown.Section>
              <Dropdown.Section title="Danger zone">
                <Dropdown.Item
                  key="delete"
                  color="error"
                  command="⌘⇧D"
                  description="Permanently delete the file"
                  icon={<DeleteDocumentIcon size={22} fill="currentColor" />}
                >
                  Delete file
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="warning"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => logOutWallet({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  {address
                    ? `${address.substring(0, 8)}...${address.substring(
                        address.length - 4
                      )}`
                    : null}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <Navbar.Item>
          <Button color="primary" auto onPress={() => connect()}>
            Connect Wallet
          </Button>
        </Navbar.Item>
      )}
    </>
  );
};

export default Connector;
