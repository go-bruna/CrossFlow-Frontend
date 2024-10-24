// import { useState } from "react"
import Header from "@/components/layout/base/header";
import Paragraph from "@/components/paragraph";
import { Avatar } from "@/components/avatar";
import { LogoIcon } from "@/assets/icons/logo";
import { Typography } from "@/components/typography";
import Button from "@/components/button";
import { useDrawer } from "@/contexts/interface";
import { useStakeSummary } from "@/hooks/queries/useStakeSummary";
import { useEffect } from "react";
import { queryClient } from "@/wagmi";
import { GET_STAKE_SUMMARY } from "@/constants/query";
import { numberFormat } from "@/utils";
import { useAccount } from "graz";
import StakingSkeleton from "./skeleton";

// const arr1 = [1,2,3,4]
// const arr2 = [1,2,3,4,5,6,7,8]

export const StakePage = () => {
	const { setDrawer } = useDrawer()
	const { data: account } = useAccount()
	const { data: stakeSummary, isLoading } = useStakeSummary(account?.bech32Address)
	
	// invalidate queries
	const invalidateQuery = async () => {
		Promise.all([
			queryClient.invalidateQueries({ queryKey: [GET_STAKE_SUMMARY] }),
			// queryClient.invalidateQueries({
			//   queryKey: [GET_ACCOUNT_BORROWED],
			// }),
		])
	}

	useEffect(() => {
		invalidateQuery()
	}, [])

	if (isLoading) {
		return <StakingSkeleton />
	}
	
	return (
		<div className="w-full animate-fade-in-up">
			{/* Header */}
			<Header.Desktop title={'Stake'} />
			
			{/* Container */}
			<div className="px-5 py-[25px] bg-[#101010] rounded-[20px] mt-[58px]">
				<Paragraph.List 
          label="You are staking "
          value={(
            <div className="flex items-center gap-1">
              <Avatar icon={<LogoIcon />} className="justify-start"/>
              <Typography variant="label-medium" className="text-[19px] crossflow-semibold">
								{numberFormat(stakeSummary?.user_staked ?? 0)}
							</Typography>
            </div>
          )}
          classOverride={{
            container: 'flex-col justify-start items-start gap-2',
            label: 'text-base crossflow-light',
          }}
        />

				{/* stats */}
				<div className="flex items-center gap-8 mt-[25px]">
					<Paragraph.List 
						label="CFN Stake APR"
						value={numberFormat(stakeSummary?.cfn_stake_apr ?? 0)}
						classOverride={{
							container: 'flex-col justify-start items-start gap-4 max-w-[120px] ',
							label: 'text-base crossflow-light',
							value: 'text-[19px] crossflow-semibold'
						}}
					/>
					<Paragraph.List 
						label="Daily Emission"
						value={(
							<div className="flex items-center">
								<Avatar icon={<LogoIcon />} className="justify-start"/>
								<Typography variant="label-medium" className="text-[19px] crossflow-semibold">
									{numberFormat(stakeSummary?.daily_emission ?? 0)}
								</Typography>
							</div>
						)}
						classOverride={{
							container: 'flex-col justify-start items-start gap-4 max-w-[160px] border-l border-[#5e7e8e]/20 pl-6',
							label: 'text-base crossflow-light',
						}}
					/>
					<Paragraph.List 
						label="Total Staked "
						value={(
							<div className="flex items-center">
								<Avatar icon={<LogoIcon />} className="justify-start"/>
								<Typography variant="label-medium" className="text-[19px] crossflow-semibold">
									{numberFormat(stakeSummary?.total_staked ?? 0)}
								</Typography>
							</div>
						)}
						classOverride={{
							container: 'flex-col justify-start items-start gap-4 border-l border-[#5e7e8e]/20 pl-6',
							label: 'text-base crossflow-light',
						}}
					/>
				</div>

				{/* button */}
				<div className="flex items-center gap-[22px] mt-10">
					<Button.Basic
						label="Stake"
						className="w-[307px] h-[52px] p-5 bg-[#0aab8b] rounded-[5px] border border-[#36f5cf]/10"
						onClick={() => setDrawer({id: 'STAKE'})}
					/>
					<Button.Basic
						label="Withdraw"
						className="w-[307px] h-[52px] p-5 bg-[#203933] rounded-[5px] border border-[#203933]/10"
						onClick={() => setDrawer({id: 'WITHDRAW'})}
					/>
				</div>
			</div>
		</div>
	);
};
