import { useMemo } from "react";

export default function useToHex(chainId) {
  return useMemo(() => {
    return "0x" + chainId.toString(16);
  }, [chainId]);
}
