import { useMemo } from "react";

export default function useShortenAddress(account) {
  return useMemo(() => {
    if (!account) return "No Account";
    const match = account.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return account;
    return `${match[1]}...${match[2]}`;
  }, [account]);
}
