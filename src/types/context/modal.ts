import { Props as IConnectWallet } from '@/components/modal/connect-wallet'


interface ConnectWalletProps extends Omit<IConnectWallet, 'onClose' | 'visible'> {
  id: 'CONNECT_WALLET'
}

export type ModalProps =
  | ConnectWalletProps