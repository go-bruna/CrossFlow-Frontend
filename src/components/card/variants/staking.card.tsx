import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import { BaseItem } from "../base/item.base"
import { Divider } from "@/components/divider"
import { StakeIcon } from "@/assets/icons/stake"
import { DelegateSmallIcon } from "@/assets/icons/delegate"

type Props = {
  className?: string
}
export const StakingCard = (props: Props) => {
  return (
    <div className={twMerge('flex flex-col gap-5', props?.className)}>
      <Typography variant="h5" className="font-bold">Staking</Typography>
      <div className="relative flex flex-col gap-5">
        <BaseItem 
          icon={<StakeIcon />}
          title='Stake'
          description='Stake your ORBK to receive Banker Power'
        />
        <BaseItem 
          icon={<DelegateSmallIcon />}
          title='Delegate'
          description='Delegate your ORBK to earn rewards'
          comingSoon={true}
        />
        <Divider 
          orientation='vertical'
          className="absolute bg-gradient-to-b from-zinc-300 to-sky-300 h-[35px] left-[13px] top-[25.5px]"
        />
      </div>
    </div>
  )
}