import { LogoIcon } from "@/assets/icons/logo";
import { Typography } from "@/components/typography";
import Button from "@/components/button";
import { WalletIcon } from "@/assets/icons/wallet";
import { useAccount } from "graz";
import { 
	useConnect, 
	useAccount as wagmiUseAccount 
} from "wagmi";
import { useModal } from "@/contexts/interface";
import { useAuth } from "@/contexts/auth";
import { useMemo } from "react";

export interface Props {
	title: string
}

export const Header = ({
	title,
}: Props) => {
	const { setModal } = useModal()
	const { data: account, isConnected } = useAccount()
	const { authState } = useAuth()
	// ether metamask
	const { address, connector, isConnected: wagmiIsConnected } = wagmiUseAccount();
	const { connectors } = useConnect();

	const _is_connected_metamask =
		(address && wagmiIsConnected && connector === connectors[0]) ?? false;

	// get connected wallet count
	const calcWalletCount = useMemo(() => {
		if (isConnected && authState.paymentAccount?.address && _is_connected_metamask)
			return 3
		else if (
			isConnected && authState.paymentAccount?.address && !_is_connected_metamask ||
			isConnected && _is_connected_metamask && !authState.paymentAccount?.address ||
			authState.paymentAccount?.address && _is_connected_metamask && !isConnected
		)
			return 2
		else if (!isConnected && !authState.paymentAccount?.address && !_is_connected_metamask)
			return 0
		else 
			return 1
	}, [account, isConnected, authState, connectors, wagmiIsConnected, address])

	// get badge object to display badge with connected wallet count
	const badgeObj = useMemo(() => {
		const _initial_data = {
			isBadge: false,
			count: 0
		}

		const isBadge = isConnected || authState.connected_wallet || _is_connected_metamask
		const count = calcWalletCount

		return {
			..._initial_data,
			isBadge,
			count,
		}

	}, [account, isConnected, authState, connectors, wagmiIsConnected, address])

	return (
		<div className="flex justify-between items-center w-full">
			<div className="flex justify-center items-center gap-6">
				<div className="flex items-center gap-2 cursor-pointer">
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
					isBadge={badgeObj.isBadge ? true : false}
					badgeCount={badgeObj.count}
					icon={account && isConnected ? <WalletIcon /> : undefined}
					className="gap-2 w-[150px] h-[36px] border border-[#36f5cf]/10 rounded-full"
					textStyle="text-white text-sm"
					onClick={() => setModal({ id: 'CONNECT_WALLET' })}
				/>
			</div>
		</div>
	);
};
