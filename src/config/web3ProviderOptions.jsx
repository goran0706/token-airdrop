import Authereum from "authereum";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Fortmatic from "fortmatic";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import metamask from "../assets/svg/metamask.svg";

const {
  REACT_APP_INFURA_ID,
  REACT_APP_FORTMATIC_KEY,
  REACT_APP_FORTMATIC_RPC_URL,
  REACT_APP_PORTIS_ID,
} = process.env;

const web3ProviderOptions = {
  injected: {
    display: {
      logo: metamask,
      name: "Injected",
      description: "Connect with the provider in your Browser",
    },
    package: null,
  },
  authereum: {
    package: Authereum,
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "My Awesome App", // Required
      infuraId: REACT_APP_INFURA_ID, // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  fortmatic: {
    package: Fortmatic, // required
    options: {
      key: REACT_APP_FORTMATIC_KEY, // required
      network: {
        rpcUrl: REACT_APP_FORTMATIC_RPC_URL,
        chainId: 137,
      }, // if we don't pass it, it will default to localhost:8454
    },
  },
  portis: {
    package: Portis, // required
    options: {
      id: REACT_APP_PORTIS_ID, // required
    },
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: REACT_APP_INFURA_ID, // required
    },
  },
};

export default web3ProviderOptions;
