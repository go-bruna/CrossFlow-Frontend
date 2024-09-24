import { CHAIN_ID } from '@/constants'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/hooks/useToast'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { Typography } from '@/components/typography'
import { Wallet } from './wallet'
import {
  MetamastWallet,
  WalletConnect,
} from '@/assets/icons/png'
import { ERROR_MESSAGE } from '@/constants/message'

export const Wallets = () => {
  const { messageApi } = useToast()
  const { address, connector } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const {
    disconnectWallet,
  } = useAuth()

  const _is_connected_metamask =
    (address && connector === connectors[0]) ?? false
  const _is_connected_wallet = (address && connector === connectors[1]) ?? false

  const handleMetamask = () => {
    if (_is_connected_metamask) disconnect()
    else {
      connect(
        { connector: connectors[0] },
        {
          onSuccess() {
            switchChain({ chainId: CHAIN_ID })
            
          },
          onError(error) {
            const err_msg = error.message.includes('Provider not found.')
              ? 'Please install Metamask wallet!'
              : error.message.toString()
            messageApi.Alert(ERROR_MESSAGE(err_msg))
          },
        },
      )
    }
  }

  const handleWalletConnect = () => {
    if (_is_connected_wallet) disconnectWallet()
    else {
      connect(
        { connector: connectors[1] },
        {
          onSuccess() {
            console.log(connectors)
            switchChain({ chainId: CHAIN_ID })
          },
          onError(error) {
            const err_msg = error.message.includes('Provider not found.')
              ? 'Please install Metamask wallet!'
              : error.message.toString()
            messageApi.Alert(ERROR_MESSAGE(err_msg))
          },
        },
      )
    }
  }

  return (
    <>
      {/* drawer body */}

      {/* Ethereum wallets */}
      <div className="flex flex-col gap-5" data-testid="ether-wallet">
        <Typography variant="label-medium" className='font-bold'>Ethereum</Typography>
        <div className="flex flex-col justify-center">
          <Wallet
            img={WalletConnect}
            address={
              _is_connected_wallet ? (address as string) : 'Wallet Connect'
            }
            status={_is_connected_wallet}
            onConnect={handleWalletConnect}
          />
          <Wallet
            type="metamask"
            img={MetamastWallet}
            address={
              _is_connected_metamask ? (address as string) : 'Metamask Wallet'
            }
            status={_is_connected_metamask}
            onConnect={handleMetamask}
          />
        </div>
      </div>
    </>
  )
}
