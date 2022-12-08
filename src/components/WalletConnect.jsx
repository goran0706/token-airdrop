import { createStyles, UnstyledButton, Text, Group } from "@mantine/core";
import useShortenAddress from "../hooks/useShortenAddress";
import useWeb3Context from "../hooks/useWeb3Context";
import Identicon from "./Identicon";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: 4,
    paddingRight: 4,
    height: 36,
    gap: 4,
  },
  connectButton: {
    height: 28,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    fontWeight: "bold",
    borderRadius: 28,
    backgroundImage:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    color: theme.white,
  },
  address: {
    lineHeight: 1,
  },
}));

const WalletConnect = () => {
  const { classes } = useStyles();
  const { account, connect, disconnect } = useWeb3Context();

  const handleClick = () => (account ? disconnect() : connect());
  const renderConnectButtonLabel = () => (account ? "Disconnect" : "Connect");

  return (
    <Group className={classes.control} position="center">
      <Identicon size={24} seed={account} />
      <Text size="sm" className={classes.address}>
        {useShortenAddress(account)}
      </Text>
      <UnstyledButton className={classes.connectButton} onClick={handleClick}>
        {renderConnectButtonLabel()}
      </UnstyledButton>
    </Group>
  );
};

export default WalletConnect;
