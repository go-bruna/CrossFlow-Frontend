import { wagmiConfig } from "@/config/wagmi";
import { cookieToInitialState } from "wagmi";
import { Web3Provider } from "./web3";
import { TxModalProvider } from "./tx-modal";
import { AuthStateProvider } from "./auth";
import { InterfaceProvider } from "./interface";
import { CustomWagmiProvider } from "@/wagmi";
import Cookies from "js-cookie";

const providers = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
	const initialState = cookieToInitialState(wagmiConfig, Cookies.get("cookie"));

	return (
		<CustomWagmiProvider initialState={initialState}>
			<AuthStateProvider>
				<TxModalProvider>
					{/* <MempoolProvider> */}
					{/* <WagmiProvider 
                config={wagmiConfig}
              > */}
					<Web3Provider>
						<InterfaceProvider>{children}</InterfaceProvider>
					</Web3Provider>
					{/* </WagmiProvider> */}
					{/* </MempoolProvider> */}
				</TxModalProvider>
			</AuthStateProvider>
		</CustomWagmiProvider>
	);
};

export default providers;
