import { useContext } from "react";
import Web3Context from "../contexts/web3Context";

const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be called from within a Web3Provider");
  }
  return context;
};

export default useWeb3Context;
