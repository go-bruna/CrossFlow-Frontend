import { useAccount, useConnect } from 'wagmi'
import { Typography } from '../typography'
import { displayAddress } from '@/utils'
import { twMerge } from 'tailwind-merge'
import { EthereumIMG } from '@/assets/icons/png'

interface Props {
  walletType: string
  textColor?: string
  className?: string
}

export const WalletAddress = (props: Props) => {
  const { address, connector, isConnected } = useAccount()
  const { connectors } = useConnect()

  const _is_etherwallet_connected =(address && isConnected && (connector === connectors[0] || connector === connectors[1])) ?? false
  // const _is_etherwallet_connected =(address && isConnected && (connector === connectors[0] || connector === connectors[1])) ?? false

  if (props.walletType === 'Ethereum') {
    if (_is_etherwallet_connected) {
      return (
        <div className="flex items-center gap-2">
          <img src={EthereumIMG} alt="Eth" width={26} />
          <Typography
            variant="label-medium"
            className={twMerge('font-bold', props?.textColor)}
          >
            {displayAddress(address as string, 6)}
          </Typography>
        </div>
      )
    }
  } else if (!_is_etherwallet_connected) {
    return (
      <Typography variant="label-medium" className="font-bold">
        Connect Wallet
      </Typography>
    )
  }
  return null
}
