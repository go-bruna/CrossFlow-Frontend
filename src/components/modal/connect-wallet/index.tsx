import Modal from "react-modal";
import { MobileModalStyle, ModalStyle } from "../style";
import type { BaseProps } from "../types";
import Card from "@/components/card";
import { Typography } from "@/components/typography";
import { Icon } from "@/components/icon";
import { CancelImg, MetamastWallet, WalletConnect } from "@/assets/icons/png";
import { Wallet } from "@/components/drawer/base/wallet/wallet";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { useToast } from "@/hooks/useToast";
import { useAuth } from "@/contexts/auth";
import { CHAIN_ID } from "@/constants";
import { ERROR_MESSAGE } from "@/constants/message";
import { useWindowSize } from "@/hooks/useWindowSize";

export interface Props extends BaseProps {}

export const ConnectWallet = (props: Props) => {
	const { visible, onClose } = props;
	const { isMobile } = useWindowSize();
	const { messageApi } = useToast();
	const { address, connector, isConnected } = useAccount();
	const { connectors, connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { switchChain } = useSwitchChain();
	const { disconnectWallet } = useAuth();

	const _is_connected_metamask =
		(address && isConnected && connector === connectors[0]) ?? false;
	const _is_connected_wallet =
		(address && isConnected && connector === connectors[1]) ?? false;

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

	const handleWalletConnect = () => {
		if (_is_connected_wallet) {
			disconnectWallet();
			onClose();
		} else {
			connect(
				{ connector: connectors[1] },
				{
					onSuccess() {
						onClose();
						switchChain({ chainId: CHAIN_ID });
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

	return (
		<Modal
			isOpen={visible}
			onRequestClose={onClose}
			style={isMobile ? MobileModalStyle : ModalStyle}
		>
			<Card.Wrapper
				classOverride={{
					subContainer: "flex flex-col gap-2 to-white px-5 pb-5 pt-2",
				}}
			>
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
							img={WalletConnect}
							address={
								_is_connected_wallet ? (address as string) : "Wallet Connect"
							}
							status={_is_connected_wallet}
							onConnect={handleWalletConnect}
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
				</>
			</Card.Wrapper>
		</Modal>
	);
};
