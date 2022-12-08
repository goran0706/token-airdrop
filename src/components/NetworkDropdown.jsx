import { Menu, createStyles, UnstyledButton } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useCallback } from "react";
import PropTypes from "prop-types";
import useWeb3Context from "../hooks/useWeb3Context";
import images from "../constants/images";

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
  },
  button: {
    height: 36,
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
  networkLabel: {
    lineHeight: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
}));

function NetworkDropdown({ networkLabel, networkList }) {
  const { classes } = useStyles();
  const { network, switchNetwork } = useWeb3Context();
  const networkName = network?.name || "Not connected to a network";

  const handleNetworkSwitch = useCallback(
    (chainId) => {
      switchNetwork(chainId);
    },
    [switchNetwork]
  );

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton className={classes.button}>
          {upperFirst(networkName)}
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{networkLabel}</Menu.Label>
        {networkList.map(({ chainId, chainName, icon }) => (
          <Menu.Item
            key={chainId}
            icon={
              <img src={images[icon]} alt={icon} className={classes.icon} />
            }
            onClick={() => handleNetworkSwitch(chainId)}
          >
            {chainName}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default NetworkDropdown;

NetworkDropdown.propTypes = {
  networkLabel: PropTypes.string.isRequired,
  networkList: PropTypes.arrayOf(
    PropTypes.shape({
      network: PropTypes.string,
      chainId: PropTypes.number,
    })
  ),
};
