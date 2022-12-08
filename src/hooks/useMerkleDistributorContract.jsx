import useContract from "./useContract";
import MERKLE_DISTRIBUTOR_ABI from "../assets/abi/MerkleDistributor.json";
const MERKLE_DISTRIBUTOR = process.env.REACT_APP_MERKLE_DISTRIBUTOR_ADDRESS;

const useMerkleDistributorContract = () => {
  return useContract(MERKLE_DISTRIBUTOR, MERKLE_DISTRIBUTOR_ABI, true);
};

export default useMerkleDistributorContract;
