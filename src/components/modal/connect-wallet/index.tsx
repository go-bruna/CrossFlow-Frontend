import Modal from "react-modal";
import { MobileModalStyle, ModalStyle } from "../style";
import type { BaseProps } from "../types";
import { Typography } from "@/components/typography";
import { Icon } from "@/components/icon";
import { 
	CancelImg, 
	KelprWallet, 
	MetamastWallet, 
	// MetamastWallet, 
	UnisatWallet 
} from "@/assets/icons/png";
import { Wallet } from "@/components/drawer/base/wallet/wallet";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { 
	useConnect as garzUseConnect, 
	useAccount as garzUseAccount, 
	useDisconnect as garzDisconnect,
	checkWallet, 
	WalletType
} from 'graz'
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/auth";
// import { CHAIN_ID } from "@/constants";
import { 
	ERROR_MESSAGE,
	// ERROR_MESSAGE, 
	WALLET_INSTALL 
} from "@/constants/message";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useActiveChains, useSuggestChainAndConnect } from "graz";
import { cosmoshub } from "@/config/graz";
import { CHAIN_ID } from "@/constants";

export interface Props extends BaseProps {}

export const ConnectWallet = (props: Props) => {
	const { visible, onClose } = props;
	const { isMobile } = useWindowSize();
	const { messageApi } = useToast();
	// ether metamask
	const { address, connector, isConnected } = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { switchChain } = useSwitchChain();
	// btc wallets
	const { 
		authState, 
		disconnectWallet,
		connectUnisatWallet,
	} = useAuth();
	const _is_btcWallet_connected =
		authState.connected_wallet && authState.paymentAccount?.address

	///////////////////////////////////////////////////////
	////// Kelpr wallet connection and disconnection //////
	///////////////////////////////////////////////////////
	const { suggestAndConnect } = useSuggestChainAndConnect();
	const activeChains = useActiveChains();
	const garzConnection = garzUseConnect()
	const garzAccount = garzUseAccount()
	const garzDisconnection = garzDisconnect()
	const isKeplrSupported = checkWallet(WalletType.KEPLR);
	///////////////////////////////////////////////////////
	//// End Kelpr wallet connection and disconnection ////
	///////////////////////////////////////////////////////

	const _is_connected_metamask =
		(address && isConnected && connector === connectors[0]) ?? false;

	const handleMetamask = () => {
		if (_is_connected_metamask) {
			disconnect();
			onClose();
		} else {
			connect(
				{ connector: connectors[0] },
				{
					onSuccess() {
						switchChain({ chainId: CHAIN_ID });
						onClose();
					},
					onError(error) {
						const err_msg = error.message.includes("Provider not found.")
							? "Please install Metamask wallet!"
							: error.message.toString();
						messageApi.Alert(ERROR_MESSAGE(err_msg));
					},
				},
			);
		}
	};

	const handleSuggestionAndConnect = () => {
		suggestAndConnect({
      chainInfo: cosmoshub,
      walletType: WalletType.KEPLR,
    });
	}

	const connectWallet = async() => {
		if (isKeplrSupported) {
			if (garzAccount.isConnected) {
				garzDisconnection.disconnect()
				return onClose()
			} else {
				if (!activeChains) {
					handleSuggestionAndConnect()
					return onClose();
				} 
				garzConnection.connect({ chainId: cosmoshub.chainId, walletType: WalletType.KEPLR });
				return onClose();
			}
		} else {
			messageApi.Alert(WALLET_INSTALL("Keplr"));
			return onClose();
		}
	}

	return (
		<Modal
			isOpen={visible}
			onRequestClose={onClose}
			style={isMobile ? MobileModalStyle : ModalStyle}
		>
			<div className="flex flex-col gap-2 to-white px-5 pb-5 pt-2 bg-[#101010]">
				<>
					<div className="flex justify-between items-center py-2">
						<Typography variant="label-large" className="font-bold">
							Connect Wallet
						</Typography>
						<Icon
							src={CancelImg}
							className="w-[14px] h-[14px]"
							onClick={onClose}
						/>
					</div>
					<Typography variant="label-medium" className="font-bold">
						Ethereum
					</Typography>

					<div className="flex flex-col justify-center">
						<Wallet
							img={KelprWallet}
							address={
								garzAccount.data?.bech32Address && garzAccount.isConnected ? garzAccount.data?.bech32Address : 'Connect Wallet'
							}
							status={garzAccount.isConnected}
							onConnect={connectWallet}
						/>
						<Wallet
							type="metamask"
							img={MetamastWallet}
							address={
								_is_connected_metamask ? (address as string) : "Metamask Wallet"
							}
							status={_is_connected_metamask}
							onConnect={handleMetamask}
						/> 
					</div>

					<Typography variant="label-medium" className="font-bold">
						Bitcoin
					</Typography>

					<div className="flex flex-col justify-center">
						<Wallet
							img={UnisatWallet}
							address={
								_is_btcWallet_connected ? (authState.paymentAccount?.address as string) : "Wallet Connect"
							}
							status={!!_is_btcWallet_connected}
							onConnect={!_is_btcWallet_connected ? connectUnisatWallet : disconnectWallet}
						/>
					</div>
				</>
			</div>
		</Modal>
	);
};
