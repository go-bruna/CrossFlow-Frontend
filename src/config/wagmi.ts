import { mainnet, sepolia } from "wagmi/chains";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "b2ad805bea23251ca826e54a17a41e1a";

export const chains = [mainnet, sepolia] as const;

export const transports = {
	[mainnet.id]: http(),
	[sepolia.id]: http(),
};

export const storage = createStorage({
	storage: cookieStorage,
});

export const wagmiConfig = createConfig({
	chains,
	connectors: [metaMask(), walletConnect({ projectId }), safe()],
	transports,
});
