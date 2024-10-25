import { IAccount, WalletType } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { getAddressInfo } from "bitcoin-address-validation";
import { AccountSchema } from "@/schemas/wallet";
import { useToast } from "@/hooks/useToast";
import { clearCookie, getCookie, setCookie } from "@/utils";
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL } from "@/constants/message";

import { invalidateWalletQueries } from "..";

export interface Wallet {
	type: WalletType;
	installed: boolean;
	methods?: {
		switchNetwork: (network: "testnet" | "mainnet") => Promise<void>;
		requestAccounts: () => Promise<string[]>;
		getPublicKey: () => Promise<string>;
		sendBitcoin: (
			to: string,
			amount: number,
			options?: {
				feeRate: number;
			},
		) => Promise<string>;
		signMessage: (message: string, algorithm?: string) => Promise<string>;
		sendInscription: (
			recipient: string,
			inscriptionId: string,
			options?: {
				feeRate: number;
			},
		) => Promise<string>;
		getInscriptions: () => Promise<string[]>;
		inscribeTransfer: (ticker: string, amount: string) => Promise<string>;
	};
	accounts: {
		payment: IAccount | undefined;
		ordinals: IAccount | undefined;
	};
}

export const useOkxWallet = () => {
	const { messageApi } = useToast();

	const [wallet, setWallet] = useState<Wallet>({
		type: WalletType.OKX,
		installed: false,
		methods: undefined,
		accounts: {
			payment: undefined,
			ordinals: undefined,
		},
	});

	const connected_wallet: WalletType | null | undefined =
		getCookie("connected_wallet");

	const connect = async () => {
		if (
			connected_wallet === WalletType.OKX &&
			wallet?.accounts?.payment?.address?.length &&
			wallet?.accounts?.ordinals?.address?.length
		)
			return;

		if (!wallet?.installed || !wallet?.methods)
			return messageApi.Alert(WALLET_INSTALL("Okx"));

		try {
			const _accounts = await wallet?.methods?.requestAccounts();
			if (_accounts?.length === 0) return;

			const _publicKey = await wallet?.methods?.getPublicKey();
			const _addressInfo = getAddressInfo(_accounts[0]);

			const account = {
				address: _accounts[0],
				addressType: _addressInfo.type,
				publicKey: _publicKey,
			};

			const { error, value } = AccountSchema.validate(account);
			if (error) throw new Error("Invalid account");

			setCookie("wallet_address", _addressInfo.address);
			setCookie("connected_wallet", WalletType.OKX);

			const newWallet = {
				...wallet,
				type: WalletType.OKX,
				accounts: {
					payment: value,
					ordinals: value,
				},
			};

			setWallet(newWallet);
		} catch (error) {
			console.error("Error on connecting Okx wallet", error);
			messageApi.Alert(FAILED_WALLET_CONNECTION);
		}
	};

	const disconnect = () => {
		clearCookie("connected_wallet");
		clearCookie("wallet_address");
		setWallet({
			type: WalletType.OKX,
			installed: false,
			methods: undefined,
			accounts: {
				payment: undefined,
				ordinals: undefined,
			},
		});
		window.location.reload();
	};

	useEffect(() => {
		if ("okxwallet" in window && (window as unknown as any).okxwallet.bitcoin) {
			const provider = (window as unknown as any).okxwallet.bitcoin
			const newWallet = {
				...wallet,
				installed: true,
				methods: provider,
			};

			setTimeout(() => {
				setWallet(newWallet);
			}, 100);
		}
	}, [connected_wallet]);

	useEffect(() => {
		if (!!wallet?.methods && connected_wallet === WalletType.OKX) {
			connect();

			const provider = (window as unknown as any).okxwallet.bitcoin
			const handleAccountsChanged = async (accounts: string[]) => {
				invalidateWalletQueries(accounts[0]);
				setWallet({
					...wallet,
					accounts: {
						payment: undefined,
						ordinals: undefined,
					},
				});
				connect();
			};

			provider.on("accountsChanged", handleAccountsChanged);

			return () => {
				provider.removeListener("accountsChanged", handleAccountsChanged);
			};
		}
	}, [wallet]);

	return {
		wallet,
		connect,
		disconnect,
	};
};
