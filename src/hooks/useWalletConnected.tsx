import { useAuth } from '@/contexts/auth'
import { useAccount, useConnect } from 'wagmi'

export const useWalletConnected = () => {
  const { authState } = useAuth()
  const { connectors } = useConnect()
  const { address, connector, isConnected } = useAccount()

  const _is_connected_metamask =
    (address && isConnected && connector === connectors[0]) ?? false
  const _is_connected_wallet = (address && isConnected && connector === connectors[1]) ?? false

  return {
    connected: _is_connected_metamask || _is_connected_wallet,
    ethWalletConnected: _is_connected_metamask || _is_connected_wallet,
    btcWalletConnected: !!authState.connected_wallet,
  }
}
