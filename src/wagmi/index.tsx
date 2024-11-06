import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
	metaMaskWallet,
	safeWallet,
	walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { chains, storage, transports } from "@/config/wagmi";
import { cosmoshub } from "@/config/graz";
import { GrazProvider, WalletType } from "graz";

if (!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID)
	throw new Error(
		"Missing VITE_WALLETCONNECT_PROJECT_ID environment variable.",
	);

const config = getDefaultConfig({
	appName: "Crossflow",
	projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
	chains,
	wallets: [
		{
			groupName: "Recommended",
			wallets: [metaMaskWallet, walletConnectWallet, safeWallet],
		},
	],
	storage,
	transports,
});

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export function CustomWagmiProvider({
	children,
	initialState,
}: {
	children: React.JSX.Element;
	initialState?: State;
}) {
	return (
		<WagmiProvider config={config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>
					<GrazProvider 
						grazOptions={{
							chains: [cosmoshub],
							defaultWallet: WalletType.KEPLR,
							autoReconnect: true,
						}}
					>
						{children}
					</GrazProvider>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
