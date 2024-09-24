import { BaseItem } from "../base/item.base";
import { Typography } from "@/components/typography";
import { StakeIcon } from "@/assets/icons/stake";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "@/components/button";

export const ORBKConnectWalletCard = () => {
	return (
		<div className="flex flex-col gap-[15px] w-full">
			<Typography variant="label-medium">
				Total <span className="font-bold">ORBK</span> Balance
			</Typography>
			<BaseItem
				icon={<StakeIcon />}
				title="ORBK"
				classOverride={{
					icon: "w-[38px] h-[38px]",
					title: "text-[23px] font-bold",
					textGap: "flex-row gap-0 items-center",
				}}
			/>
			<ConnectButton.Custom>
				{({ account, chain, openChainModal, openConnectModal, mounted }) => {
					const ready = mounted;

					const connected = ready && account && chain;

					return (
						<div
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
											label="Connect Wallet"
											onClick={openConnectModal}
											className="w-full"
										/>
									);
								}

								if (chain.unsupported) {
									return (
										<Button.Basic
											label="Wrong network"
											onClick={openChainModal}
											className="w-full"
										/>
									);
								}

								return null;
							})()}
						</div>
					);
				}}
			</ConnectButton.Custom>
		</div>
	);
};
