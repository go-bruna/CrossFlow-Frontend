import { Typography } from "@/components/typography";
import { ORBKItem } from "../base/item.ORBK";
import { Tab } from "@/components/tab";
import { useCallback, useEffect, useState } from "react";
import Paragraph from "@/components/paragraph";
import { BaseItem } from "../base/item.base";
import Button from "@/components/button";
import { useWeb3Context } from "@/contexts/web3/useWeb3";
import { useOrdiPrices } from "@/hooks/queries/useOrbkPrice";
import { useToast } from "@/hooks/useToast";
import { INPUT_AMOUNT, WARNING_MESSAGE } from "@/constants/message";
import { IDuration } from "@/types/interfaces";
import { DURATIONS_TIME } from "@/constants";
import { TailSpin } from "react-loader-spinner";
import { BankerPowerIcon } from "@/assets/icons/banker-power";
import { useWindowSize } from "@/hooks/useWindowSize";
import Card from "..";
import { twMerge } from "tailwind-merge";

export const ORBKBalanceCard = () => {
	const { isMobile, windowSize } = useWindowSize();
	const { messageApi } = useToast();
	const [selected, setSelected] = useState<string>("3M");
	const [staking, setStaking] = useState<boolean>(false);
	const [apr, setAPR] = useState<number>(0);
	const [rewards, setRewards] = useState<number>(0);
	const {
		loading,
		pending,
		completed,
		balance,
		periodStaked,
		writeApproveStake,
		writeStake,
		allowance,
		getAPRAndRewards,
		getTotalStakedInPeriod,
	} = useWeb3Context();
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [ stakedInPeriod, setStakedInPeriod ] = useState<number>(0)
	const { price } = useOrdiPrices();
	const [selectedDuration, setSelectedDuration] = useState<IDuration>(
		DURATIONS_TIME[0],
	);

	const tvl_price =
		(!price && price === 0) || amount === undefined
			? 0
			: parseFloat((amount * (price ?? 0)).toFixed(1));

	// Select the period of staking
	const onSelectPeriod = async (m: string) => {
		var month = m.replace(/\D/g, "");
		const selectedIndex = DURATIONS_TIME.filter(
			(e) => e.period === Number(month),
		)[0];
		setSelectedDuration(selectedIndex);
		setSelected(m);
	};

	// Staking
	const onStake = () => {
		if (!amount || amount <= 0) {
			return messageApi.Alert(INPUT_AMOUNT);
		}
		if (amount > balance?.ORDS)
			return messageApi.Alert({
				...WARNING_MESSAGE,
				content: "Insufficient Balance",
			});

		if (periodStaked === 100)
			return messageApi.Alert({
				...WARNING_MESSAGE,
				content: "Already full staked",
			});
		if (amount > balance?.ORBK) {
			return messageApi.Alert({
				...WARNING_MESSAGE,
				content: "Amount should be less than ORBK balance",
			});
		}

		setStaking(true);
		if (amount > allowance) {
			writeApproveStake(amount, selectedDuration.index);
		} else {
			writeStake(amount, selectedDuration.index);
		}
	};

	useEffect(() => {
		if (completed) {
			setAmount(0);
			setStaking(false);
		}
	}, [completed]);

	const fetchAPR = useCallback(async () => {
      const { apr: _apr, expectedRewards } = await getAPRAndRewards(
        amount,
        selectedDuration.index,
      );
      setAPR(_apr);
      setRewards(expectedRewards);
			const _stakedInPeriod = await getTotalStakedInPeriod(selectedDuration.index)
			setStakedInPeriod(_stakedInPeriod)
	}, [amount, selected]);

	useEffect(() => {
    fetchAPR();
	}, [amount, selected]);

	const stakingButton = () => {
		if (staking && (loading || pending)) {
			return (
				<div className="flex justify-center items-center py-5 bg-gray-900 rounded-[20px]">
					<TailSpin
						visible={true}
						height="30"
						width="30"
						// color="#4fa94d"
						color="#38bdf8"
						ariaLabel="tail-spin-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			);
		}

		return (
			<Button.Basic label="Stake ORBK" className="py-5" onClick={onStake} />
		);
	};
	return (
		<div className="flex flex-col lg:flex-row gap-4 lg:gap-0">
			<Card.Wrapper
				classOverride={{
					container: twMerge(
						"lg:w-[400px]",
						isMobile && `w-full max-w-[${windowSize.width - 40}px]`,
					),
				}}
			>
				<div className="flex flex-col gap-[15px] w-full">
					<ORBKItem
						balance={balance?.ORBK || 0}
						amount={amount}
						price={tvl_price}
						onChange={setAmount}
					/>
					<div className="flex flex-col gap-[10px]">
						<Typography variant="label-small" className="font-bold">
							Duration
						</Typography>
						<Tab
							tabs={["3M", "6M", "12M", "24M"]}
							selected={selected}
							onSelect={onSelectPeriod}
						/>
					</div>
					<Paragraph.List
						label={
							<BaseItem
								icon={<BankerPowerIcon />}
								title="Banker Power"
								classOverride={{
									container: "gap-[6px]",
									title: "text-[13px] font-bold",
									textGap: "flex-row items-center",
								}}
							/>
						}
						value={amount?.toLocaleString() ?? "N/A"}
					/>
					<div className="flex flex-col gap-1">
					<Paragraph.List
							label={"Total Staked in Period"}
							value={`${Number(stakedInPeriod.toFixed()).toLocaleString()} ORBK`}
							classOverride={{ label: "font-bold" }}
						/>
						<Paragraph.List
							label={"ORBK Rewards"}
							value={`${Number(rewards.toFixed()).toLocaleString()} ORBK`}
							classOverride={{ label: "font-bold" }}
						/>
						<Paragraph.List
							label={"Lock time"}
							value={selectedDuration.maxLabel}
							classOverride={{ label: "font-bold" }}
						/>
					</div>
					<Paragraph.List
						label={"APR"}
						value={`${apr} %`}
						classOverride={{
							label: "font-bold",
							value: "text-green-600",
						}}
					/>

					{!isMobile && stakingButton()}
				</div>
			</Card.Wrapper>
			{isMobile && stakingButton()}
		</div>
	);
};
