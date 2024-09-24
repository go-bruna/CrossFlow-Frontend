// import { useState } from "react"
import Header from "@/components/layout/base/header";
import Card from "@/components/card";
import Paragraph from "@/components/paragraph";
import Table from "@/components/table";
// import { ValidatorItem } from "./components/validators"
// import Button from "@/components/button"
import { StakingCard } from "@/components/card/variants/staking.card";
import { useWindowSize } from "@/hooks/useWindowSize";
import { twMerge } from "tailwind-merge";
import { Statsbar } from "./components/statsbar";
import { useAccount } from "wagmi";

// const arr1 = [1,2,3,4]
// const arr2 = [1,2,3,4,5,6,7,8]

export const StakePage = () => {
	const { isMobile, windowSize } = useWindowSize();
	const { isConnected } = useAccount();

	// const [ arr, setArr ] = useState<any[]>(arr1)
	return (
		<div className="w-full">
			{/* Header */}
			<Header.Desktop title={'Stake'} />
			
			{/* Container */}
			<div className="mt-[58px]">
				<div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-0 max-w-[1180px]">
					<div className="flex flex-col gap-6 lg:w-1/2">
						<Paragraph.Basic
							title="OrdiBank Governance"
							subTitle="Participate in maintaining the OrdiBank protocol"
							descripton="Independently from delegating to validators in DAO activities. Create proposals, vote for them or delegate your banker power to a delegate of your choosing and earn rewards!"
							classOverride={{
								subTitleStyle: "mt-0 lg:mt-[15px]",
							}}
						/>
						<StakingCard />
					</div>
					<div
						className={twMerge(
							"flex flex-1 justify-end",
							isMobile && "w-full mt-2",
						)}
					>
						{isConnected ? (
							<Card.ORBK />
						) : (
							<Card.Wrapper
								classOverride={{
									container: twMerge(
										"lg:w-[400px]",
										isMobile && `w-full max-w-[${windowSize.width - 40}px]`,
									),
								}}
							>
								<Card.ORBKConnectWallet />
							</Card.Wrapper>
						)}
					</div>
				</div>

				{/* Stake table */}
				{isConnected && (
					<>
						<Statsbar />
						<Table.Stake />
					</>
				)}

				{/* Validators & Attesters */}
				{/* <div className="flex flex-col gap-4 lg:gap-[45px] my-10 lg:mt-[60px]">
					<Paragraph.Basic
						title="Validators & Attesters"
						descripton="Choose an OrdiBank node to delegate your banker power. Validators with the highest power are able to earn more rewards and therefore having a larger revenue share. Read more."
						classOverride={{
							containerStyle: 'lg:w-1/2'
						}}
					/>
					<div 
						className="overflow-auto"
						style={{
							maxWidth: `${windowSize.width - 40}px`,
						}}
					>
						<div className="flex gap-2 place-self-start flex-wrap min-w-[1080px]">
							{arr.map((item, index) => (
								<ValidatorItem data={item} key={index} />
							))}
						</div>
					</div>
					{arr.length < 6 && (
						<div className="flex justify-center items-center">
							<Card.Wrapper
								isShadow={false}
								classOverride={{
									subContainer: 'p-0'
								}}
							>
								<Button.Basic 
									className="bg-slate-50 border-0 px-5 py-4"
									textStyle="text-gray-900"
									label="View all resolvers"
									onClick={() => {setArr(arr2)}}
								/>
							</Card.Wrapper>
						</div>
					)}
				</div> */}
			</div>
		</div>
	);
};
