import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Context from "./web3Context";
import web3ProviderOptions from "../config/web3ProviderOptions";
import Web3Modal from "web3modal";

const web3Modal = new Web3Modal({
  theme: "dark",
  network: "rinkeby",
  cacheProvider: true,
  disableInjectedProvider: false,
  web3ProviderOptions,
});

function Web3Provider({ children }) {
  const [provider, setProvider] = useState(null);
  const [library, setLibrary] = useState(null);
  const [network, setNetwork] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState(null);
  const [message, setMessage] = useState(null);
  const [signedMessage, setSignedMessage] = useState(null);
  const [verifiedMessage, setVerifiedMessage] = useState(null);
  const [error, setError] = useState(null);

  const connect = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const network = await library.getNetwork();
      const accounts = await library.listAccounts();
      setProvider(provider);
      setLibrary(library);
      setNetwork(network);
      setChainId(toHex(network.chainId));
      setAccount(accounts && accounts[0]);
    } catch (error) {
      setError(error);
    }
  }, []);

  const disconnect = useCallback(() => {
    web3Modal.clearCachedProvider();
    refreshState();
  }, []);

  const refreshState = () => {
    setNetwork(null);
    setChainId(null);
    setAccount(null);
    setError(null);
    setSignature(null);
    setMessage(null);
    setSignedMessage(null);
    setVerifiedMessage(null);
  };

  const switchNetwork = async (chainId) => {
    try {
      await rpcRequest("wallet_switchEthereumChain", [
        { chainId: toHex(chainId) },
      ]);
      setNetwork(await library.getNetwork());
      setChainId(toHex(chainId));
    } catch (error) {
      if (error.code === 4902) {
        try {
          await rpcRequest("wallet_addEthereumChain", [
            { chainId: toHex(chainId) },
          ]);
        } catch (error) {
          setError(error);
        }
      }
      setError(error);
    }
  };

  const handleInput = (event) => {
    setMessage(event.target.value);
  };

  const signMessage = async () => {
    if (!library) return;

    try {
      const signature = await rpcRequest("personal_sign", [message, account]);
      setSignature(signature);
      setSignedMessage(message);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;

    try {
      const verify = await rpcRequest("personal_ecRecover", [
        signedMessage,
        signature,
      ]);
      setVerifiedMessage(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const rpcRequest = async (method, params) => {
    return await library.provider.request({ method, params });
  };

  const toHex = (chainId) => "0x" + chainId.toString(16);

  useEffect(() => {
    web3Modal.cachedProvider && connect();
  }, [connect]);

  useEffect(() => {
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        accounts && setAccount(accounts[0]);
      };

      const handleChainChanged = async (_hexChainId) => {
        setNetwork(await library?.detectNetwork());
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  });

  const value = {
    provider,
    library,
    network,
    chainId,
    account,
    signature,
    message,
    signedMessage,
    verifiedMessage,
    error,
    connect,
    disconnect,
    refreshState,
    switchNetwork,
    handleInput,
    signMessage,
    verifyMessage,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default Web3Provider;
