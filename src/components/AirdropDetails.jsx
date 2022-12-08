import {
  Container,
  Stack,
  Group,
  Space,
  Button,
  Text,
  Title,
  createStyles,
  Anchor,
  Center,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useMerkleDistributorContract from "../hooks/useMerkleDistributorContract";
import useWeb3Context from "../hooks/useWeb3Context";
import Identicon from "./Identicon";
import tree from "../constants/merkleTree.json";

const { claims } = tree;
const MERKLE_TREE_IPFS_URL = process.env.REACT_APP_TREE_IPFS_URL;

const useStyles = createStyles((theme) => ({
  airdrop: {
    padding: "2rem",
    marginTop: "6rem",
    borderRadius: 10,
    backgroundImage:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(
            35,
            theme.colors.dark[5],
            theme.colors.gray[8]
          )
        : theme.fn.linearGradient(
            35,
            theme.colors.gray[2],
            theme.colors.gray[0]
          ),
  },
  title: {
    background:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  buttonLabel: {
    backgroundImage:
      theme.colorScheme === "dark"
        ? theme.fn.linearGradient(35, "#ed6ea0", "#ec8c69")
        : theme.fn.linearGradient(35, "#11a0f8", "#c72dd6"),
    color: theme.white,
  },
  error: {
    color: theme.colors.red,
  },
}));

const AirdropDetails = () => {
  const { classes } = useStyles();
  const { account } = useWeb3Context();
  const contract = useMerkleDistributorContract();
  const [index, setIndex] = useState(null);
  const [proof, setProof] = useState(null);
  const [amount, setAmount] = useState(null);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const claimAirdrop = async () => {
    setIsLoading(true);
    const txHash = await contract.claim(index, account, amount, proof);
    await txHash.wait();
    setIsLoading(false);
  };

  useEffect(() => {
    const updateState = async () => {
      const claimAccounts = Object.keys(claims).map((e) => e.toLowerCase());
      const claimAccountsArr = Object.keys(claims).map((e) => ({
        address: e.toLowerCase(),
        index: claims[e]["index"],
        amount: claims[e]["amount"],
        proof: claims[e]["proof"],
      }));
      if (claimAccounts.includes(account?.toLowerCase())) {
        const accountLowercase = account.toLowerCase();
        const indexOfAccount = claimAccounts.indexOf(accountLowercase);
        const { index, proof, amount } = claimAccountsArr[indexOfAccount];
        setIndex(index);
        setProof(proof);
        setAmount(amount);
        setIsClaimed(await contract.isClaimed(index));
      } else {
        setIndex(null);
        setProof(null);
        setAmount(null);
        setIsClaimed(false);
      }
    };

    updateState();
  }, [account, contract]);

  const AccountInfo = () => {
    return (
      <Group>
        <Identicon size={64} seed={account} />
        <Stack align="flex-start" justify="flex-start" spacing="5px">
          <Title italic weight="bold" className={classes.title}>
            Account
          </Title>
          <Text>{account}</Text>
        </Stack>
      </Group>
    );
  };

  const ClaimButton = () => {
    return (
      <Button
        fullWidth
        loading={isLoading}
        className={classes.buttonLabel}
        disabled={!isClaimed && !amount}
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        onClick={() => claimAirdrop()}
      >
        Claim Airdrop
      </Button>
    );
  };

  const ConnectedUser = () => (
    <Stack>
      {!isClaimed && !amount && (
        <Text className={classes.error}>
          This account is not eligible for an airdrop.
        </Text>
      )}
      {isClaimed && amount && (
        <Text className={classes.error}>Drop already claimed.</Text>
      )}
      {!isClaimed && amount && (
        <Text>
          This account has not yet claimed the tokens. Total of {amount} tokens
          are pending to be claimed.
        </Text>
      )}
      <Text>
        For more information regarding the token distribution please visit the
        merkle tree that was uploaded on the following IPFS link -{" "}
        <Anchor href={MERKLE_TREE_IPFS_URL} target="_blank">
          MerkleDistributor.json
        </Anchor>
      </Text>
    </Stack>
  );

  const NotConnectedUser = () => (
    <Center>
      <Title italic weight="bold" className={classes.title}>
        Connect Ethereum Wallet
      </Title>
    </Center>
  );

  return (
    <Container size="sm" className={classes.airdrop}>
      {account && <AccountInfo />}
      <Space h="2rem" />
      {account ? <ConnectedUser /> : <NotConnectedUser />}
      <Space h="2rem" />
      <ClaimButton />
    </Container>
  );
};

export default AirdropDetails;
