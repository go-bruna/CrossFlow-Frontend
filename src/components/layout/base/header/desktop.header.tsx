// import { Navbar } from "../../../nav";
import { LogoIcon } from "@/assets/icons/logo";
import { Typography } from "@/components/typography";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@/components/button";
import { WalletIcon } from "@/assets/icons/wallet";

export interface Props {
	title: string
}

export const Header = ({
	title,
}: Props) => {
	const gotoMain = () => {
		window.open("https://main.d1zteq5olzyzc2.amplifyapp.com/", "_blank");
	};

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
				<ConnectButton.Custom>
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
								className=""
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
												className="gap-2 h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openConnectModal}
											/>
										);
									}

									if (chain.unsupported) {
										return (
											<Button.Basic
												label={"Wrong network"}
												className="gap-2 h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openChainModal}
											/>
										);
									}

									return (
										<div style={{ display: "flex", gap: 12 }}>
											{/* <button 
												className="flex items-center gap-2 font-base font-bold"
												onClick={openAccountModal} 
												type="button"
											>
												<img src={EthereumIMG} alt="BTC" width={26} />
												{account.displayName}
												<Avatar icon={<DropdownIcon />}/>
											</button> */}
											<Button.Basic
												label={'Connected'}
												icon={<WalletIcon />}
												className="gap-2 h-[36px] border border-[#36f5cf]/10 rounded-full"
												textStyle="text-white text-sm"
												onClick={openAccountModal}
											/>
										</div>
									);
								})()}
							</div>
						);
					}}
				</ConnectButton.Custom>
			</div>
		</div>
	);
};
