
import { IContextChildrenProps } from "@/types/context";
import { Web3Context } from "./context";
import { useSigningWeb3Client } from "@/hooks/useWeb3";

export const Web3Provider: React.FC<IContextChildrenProps> = ({
  children
}): JSX.Element => {
  const values = useSigningWeb3Client();

  return (
    <Web3Context.Provider value={values}>
      {children}
    </Web3Context.Provider>
  )
}