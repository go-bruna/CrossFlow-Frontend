// import { Navbar } from "../../../nav";
import { LogoIcon } from "@/assets/icons/logo";
import { Typography } from "@/components/typography";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@/components/button";
import { WalletIcon } from "@/assets/icons/wallet";
import { 
	useAccount, 
	// checkWallet, 
	// useActiveChains, 
	// useConnect, 
	// useDisconnect, 
	// useSuggestChainAndConnect, 
	// WalletType 
} from "graz";
// import { cosmoshub } from "@/config/graz";
// import { WALLET_INSTALL } from "@/constants/message";
// import { useToast } from "@/hooks/useToast";
import { useModal } from "@/contexts/interface";

export interface Props {
	title: string
}

export const Header = ({
	title,
}: Props) => {
	const { setModal } = useModal()
	// const { messageApi } = useToast();
	// const { suggestAndConnect } = useSuggestChainAndConnect();
	// const activeChains = useActiveChains();
	// const { connect } = useConnect()
	const { data: account, isConnected } = useAccount()
	// const { disconnect } = useDisconnect()
	// const isKeplrSupported = checkWallet(WalletType.KEPLR);

	const gotoMain = () => {
		// window.open("https://main.d1zteq5olzyzc2.amplifyapp.com/", "_blank");
	};

	// const handleSuggestionAndConnect = () => {
	// 	suggestAndConnect({
  //     chainInfo: cosmoshub,
  //     walletType: WalletType.KEPLR,
  //   });
	// }

	// const connectWallet = async() => {
	// 	if (isKeplrSupported) {
	// 		if (isConnected)
	// 			return disconnect()
	// 		else {
	// 			if (!activeChains) {
	// 				return handleSuggestionAndConnect()
	// 			} 
	// 			return connect({ chainId: cosmoshub.chainId, walletType: WalletType.KEPLR });
	// 		}
	// 	} else {
	// 		return messageApi.Alert(WALLET_INSTALL("Keplr"));
	// 	}
	// }

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex justify-center items-center gap-6">
				<div
					className="flex items-center gap-2 cursor-pointer"
					onClick={gotoMain}
				>
					<Typography variant="h4" className="font-bold">
						{title}
					</Typography>
				</div>
				{/* <Navbar /> */}
			</div>

			{/* buttonrs group */}
			<div className="flex items-center gap-5 h-12">
				
				<Button.Basic 
					label={'Claim CFN'}
					icon={<LogoIcon />}
					className="gap-1 w-[130px] h-[36px] p-0 rounded-full"
					textStyle="text-sm"
				/>

				<Button.Basic
					label={account && isConnected ? 'Connected' : 'Connect Wallet'}
					isBadge={account && isConnected ? true : false}
					icon={account && isConnected ? <WalletIcon /> : undefined}
					className="gap-2 w-[150px] h-[36px] border border-[#36f5cf]/10 rounded-full"
					textStyle="text-white text-sm"
					// onClick={connectWallet}
					onClick={() => setModal({ id: 'CONNECT_WALLET' })}
				/>

				{/* <ConnectButton.Custom>
					{({
						account,
						chain,
						openAccountModal,
						openChainModal,
						openConnectModal,
						authenticationStatus,
						mounted,
					}) => {
						// Note: If your app doesn't use authentication, you
						// can remove all 'authenticationStatus' checks
						const ready = mounted && authenticationStatus !== "loading";
						const connected =
							ready &&
							account &&
							chain &&
							(!authenticationStatus || authenticationStatus === "authenticated");

						return (
							<div
								className="w-[150px]"
								{...(!ready && {
									"aria-hidden": true,
									style: {
										opacity: 0,
										pointerEvents: "none",
										userSelect: "none",
									},
								})}
							>
								{(() => {
									if (!connected) {
										return (
											<Button.Basic
												label={"Connect Wallet"}
												className="gap-2 w-full h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openConnectModal}
											/>
										);
									}

									if (chain.unsupported) {
										return (
											<Button.Basic
												label={"Wrong network"}
												className="gap-2 w-full h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openChainModal}
											/>
										);
									}

									return (
										<div style={{ display: "flex", gap: 12 }}>
											<Button.Basic
												label={'Connected'}
												isBadge={true}
												icon={<WalletIcon />}
												className="gap-2 w-full h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openAccountModal}
											/>
										</div>
									);
								})()}
							</div>
						);
					}}
				</ConnectButton.Custom> */}
			</div>
		</div>
	);
};
