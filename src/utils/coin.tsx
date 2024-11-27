import { AmountIcon } from "@/assets/icons/amount"
import { BitcoinIcon, EthereumIcon, USDTIcon } from "@/assets/icons/coins"

export const getCoinIcon = (token: string) => {
  
  const icon = {
    btc: <BitcoinIcon />,
    eth: <EthereumIcon />,
    usdt: <USDTIcon />,
    amount: <AmountIcon />,
  }[token.toLowerCase() || 'amount'] as JSX.Element

  return icon
}
