import * as satsConnect from "sats-connect";
import { TEST_MODE } from "@/constants";
import type { IAccount } from "@/types/interfaces";
import { WalletType } from "@/types/interfaces";
import { useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { clearCookie, getCookie, setCookie } from "@/utils";
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL } from "@/constants/message";
import useStorage from "@/hooks/useStorage";

export interface Wallet {
	type: WalletType;
	installed: boolean;
	methods?: satsConnect.BitcoinProvider;
	accounts: {
		payment: IAccount | undefined;
		ordinals: IAccount | undefined;
	};
}

export const useXverseWallet = () => {
	const { messageApi } = useToast();

	const [wallet, setWallet] = useStorage<Wallet>("@wallet", {
		type: WalletType.XVERSE,
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
			connected_wallet === WalletType.XVERSE &&
			wallet?.accounts?.payment &&
			wallet?.accounts?.ordinals
		)
			return;

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
				const _accounts = response?.addresses;
				console.log("===accounts===", _accounts)
				const payment: IAccount | undefined = _accounts?.find(
					(account: IAccount) => account.purpose === "payment",
				);

				const ordinals: IAccount | undefined = _accounts?.find(
					(account: IAccount) => account.purpose === "ordinals",
				);

				if (!payment && !ordinals) throw new Error("No accounts found");

				setCookie("connected_wallet", WalletType.XVERSE);
				setCookie(
					"wallet_address",
					ordinals?.address || payment?.address || "",
				);

				const newWallet = {
					...wallet,
					type: WalletType.XVERSE,
					accounts: {
						payment,
						ordinals,
					},
				};

				setWallet(newWallet);
			},
			onCancel: () => messageApi.Alert(FAILED_WALLET_CONNECTION(`Xverse`)),
		};

		try {
			await satsConnect.getAddress(getAddressOptions);
		} catch (error) {
			console.error("Error on connecting XVerse wallet", error);
			messageApi.Alert(WALLET_INSTALL("XVerse"));
		}
	};

	const disconnect = () => {
		clearCookie("connected_wallet");
		clearCookie("wallet_address");
		setWallet({
			type: WalletType.XVERSE,
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
		if ("XverseProviders" in window && window.XverseProviders) {
			const provider = window.XverseProviders.BitcoinProvider;
			const newWallet = {
				...wallet,
				installed: true,
				methods: provider,
			};

			setWallet(newWallet);
		}
	}, []);

	useEffect(() => {
		if (!!wallet?.methods && connected_wallet === WalletType.XVERSE) connect();
	}, [wallet]);

	return {
		wallet,
		connect,
		disconnect,
	};
};
