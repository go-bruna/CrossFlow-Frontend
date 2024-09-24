import * as satsConnect from "sats-connect";
import { TEST_MODE } from "@/constants";
import { IAccount, WalletType } from "@/types/interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./context";
import { getAddressInfo } from "bitcoin-address-validation";
import { AccountSchema } from "@/schemas/wallet";
import { IContextChildrenProps } from "@/types/context";
import { useToast } from "@/hooks/useToast";
import { clearCookie, getCookie, setCookie } from "@/utils";
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL } from "@/constants/message";
import {
	WALLET_TYPE_OKX,
	WALLET_TYPE_UNISAT,
	WALLET_TYPE_XVERSE,
} from "@/constants/wallets";
import { queryClient } from "@/wagmi";

declare global {
	interface Window {
		unisat?: any;
		phantom?: any;
		okxwallet?: any;
	}
}

export const AuthStateProvider: React.FC<IContextChildrenProps> = ({
	children,
}): JSX.Element => {
	const { messageApi } = useToast();
	const [walletType, setWalletType] = useState(WALLET_TYPE_UNISAT);

	// * Wallet Variables
	const [unisatInstalled, setUnisatInstalled] = useState<boolean>(false);
	const [unisatWallet, setUnisatWallet] = useState<any | undefined>(undefined);
	const [okxInstalled, setOkxInstalled] = useState<boolean>(false);
	const [okxWallet, setOkxWallet] = useState<any | undefined>(undefined);
	const unisatListeners = useRef(false);
	const okxListeners = useRef(false);

	const [paymentAccount, setPaymentAccount] = useState<
		IAccount | null | undefined
	>();
	const [ordinalsAccount, setOrdinalsAccount] = useState<
		IAccount | null | undefined
	>();

	const connected_wallet: WalletType | null | undefined =
		getCookie("connected_wallet");

	const invalidateWalletQueries = (walletAddress: string) => {
		queryClient.invalidateQueries({
			predicate: (query) => {
				return query.queryKey.includes(walletAddress);
			},
		});
	};

	const connectUnisatWallet = useCallback(async () => {
		if (connected_wallet === WalletType.UNISAT && paymentAccount) return;
		if (!unisatInstalled || !unisatWallet) {
			messageApi.Alert(WALLET_INSTALL("Unisat"));
			return;
		}
		try {
			await unisatWallet.switchNetwork(TEST_MODE ? "testnet" : "mainnet");
			const _accounts = await unisatWallet.requestAccounts();
			if (_accounts.length === 0) return;
			const _publicKey = await unisatWallet.getPublicKey();
			const _addressInfo = getAddressInfo(_accounts[0]);
			const account = {
				address: _accounts[0],
				addressType: _addressInfo.type,
				publicKey: _publicKey,
			};
			const { error, value } = AccountSchema.validate(account);
			if (!error) {
				setCookie("connected_wallet", WalletType.UNISAT);

				setWalletType(WALLET_TYPE_UNISAT);
				setPaymentAccount(value);
				setOrdinalsAccount(value);
			}
		} catch (error) {
			console.error("Error on connecting Unisat wallet", error);
			messageApi.Alert(FAILED_WALLET_CONNECTION);
		}
	}, [unisatWallet, unisatInstalled, connected_wallet, paymentAccount]);

	const connectOkxWallet = useCallback(async () => {
		if (connected_wallet === WalletType.OKX && paymentAccount) return;
		if (!okxInstalled || !okxWallet) {
			messageApi.Alert(WALLET_INSTALL("Okx"));
			return;
		}
		try {
			const _accounts = await okxWallet.requestAccounts();
			if (_accounts.length === 0) return;
			const _publicKey = await okxWallet.getPublicKey();
			const _addressInfo = getAddressInfo(_accounts[0]);
			const account = {
				address: _accounts[0],
				addressType: _addressInfo.type,
				publicKey: _publicKey,
			};
			const { error, value } = AccountSchema.validate(account);
			if (!error) {
				setCookie("connected_wallet", WalletType.OKX);

				setWalletType(WALLET_TYPE_OKX);
				setPaymentAccount(value);
				setOrdinalsAccount(value);
			}
		} catch (error) {
			console.error("Error on connecting Okx wallet", error);
			messageApi.Alert(FAILED_WALLET_CONNECTION);
		}
	}, [okxWallet, okxInstalled, connected_wallet, paymentAccount]);

	const connectXVerseWallet = async () => {
		if (connected_wallet === WalletType.XVERSE && paymentAccount) return;
		const getAddressOptions = {
			payload: {
				network: {
					type: TEST_MODE
						? satsConnect.BitcoinNetworkType.Testnet
						: satsConnect.BitcoinNetworkType.Mainnet,
				},
				purposes: [
					satsConnect.AddressPurpose.Payment,
					satsConnect.AddressPurpose.Ordinals,
				],
				message: "Connect Wallet",
			},
			onFinish: (response: any) => {
				const _accounts = response.addresses;

				for (const account of _accounts) {
					if (account.purpose === "payment") {
						setPaymentAccount(account);
					} else if (account.purpose === "ordinals") {
						setOrdinalsAccount(account);
					}
				}
				setCookie("connected_wallet", WalletType.XVERSE);

				setWalletType(WALLET_TYPE_XVERSE);
			},
			onCancel: () => {
				messageApi.Alert(FAILED_WALLET_CONNECTION);
			},
		};

		try {
			await satsConnect.getAddress(getAddressOptions);
		} catch (error) {
			console.error("Error on connecting XVerse wallet", error);
			messageApi.Alert(WALLET_INSTALL("XVerse"));
		}
	};

	const disconnectWallet = () => {
		clearCookie("connected_wallet");
		setPaymentAccount(undefined);
		setOrdinalsAccount(undefined);
	};

	useEffect(() => {
		if ("unisat" in window) {
			const unisatProvider = window.unisat;
			setUnisatWallet(unisatProvider);
			setUnisatInstalled(true);

			if (!unisatListeners.current) {
				const handleAccountsChanged = async (accounts: string[]) => {
					invalidateWalletQueries(accounts[0]);
					setPaymentAccount(undefined);
					setOrdinalsAccount(undefined);
					connectUnisatWallet();
				};

				const handleNetworkChange = (network: "testnet" | "livenet") => {
					if (TEST_MODE && network === "livenet") {
						unisatProvider.switchNetwork("testnet");
					} else if (!TEST_MODE && network === "testnet") {
						unisatProvider.switchNetwork("livenet");
					}
				};

				unisatProvider.on("accountsChanged", handleAccountsChanged);
				unisatProvider.on("networkChanged", handleNetworkChange);

				unisatListeners.current = true;
				return () => {
					unisatProvider.removeListener(
						"accountsChanged",
						handleAccountsChanged,
					);
					unisatProvider.removeListener("networkChanged", handleNetworkChange);
					unisatListeners.current = false;
				};
			}
		}
	}, [connectUnisatWallet]);

	useEffect(() => {
		if ("okxwallet" in window && window.okxwallet.bitcoin) {
			const okxProvider = window.okxwallet?.bitcoin;
			setOkxWallet(okxProvider);
			setOkxInstalled(true);

			if (!okxListeners.current) {
				const handleAccountsChanged = async (accounts: string[]) => {
					invalidateWalletQueries(accounts[0]);
					setPaymentAccount(undefined);
					setOrdinalsAccount(undefined);
					connectOkxWallet();
				};
				okxProvider.on("accountsChanged", handleAccountsChanged);
				okxListeners.current = true;
				return () => {
					okxProvider.removeListener("accountsChanged", handleAccountsChanged);
					okxListeners.current = false;
				};
			}
		}
	}, [connectOkxWallet]);

	// * Reconnectors on page load
	useEffect(() => {
		if (!!unisatWallet && connected_wallet === WalletType.UNISAT) {
			connectUnisatWallet();
		}
	}, [connectUnisatWallet, unisatWallet, connected_wallet]);

	useEffect(() => {
		if (!!okxWallet && connected_wallet === WalletType.OKX) {
			connectOkxWallet();
		}
	}, [connectOkxWallet, okxWallet, connected_wallet]);

	useEffect(() => {
		if (connected_wallet === WalletType.XVERSE) {
			connectXVerseWallet();
		}
	}, [connected_wallet]);

	return (
		<AuthContext.Provider
			value={{
				authState: {
					paymentAccount,
					ordinalsAccount,
					walletType,
					unisatWallet,
					phantomWallet: null,
					okxWallet,
					connected_wallet,
				},
				unisatInstalled,
				phantomInstalled: false,
				connectUnisatWallet,
				connectPhantomWallet: () => {
					messageApi.Alert({
						type: "Warning",
						title: "Phantom Wallet has been unsupported temporarily.",
						content: "Please use another wallet.",
					});
				},
				connectOkxWallet,
				connectXVerseWallet,
				disconnectWallet,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
