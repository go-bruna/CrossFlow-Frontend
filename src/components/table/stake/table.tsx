import Dropdown from "@/components/dropdown"
import { Typography } from "@/components/typography"
import { useMemo, useState } from "react"
import { StakeTableBody } from "./table.body"
import { StakeTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useWeb3Context } from "@/contexts/web3"
import { IStake } from "@/types/context/web3"
import Card from "@/components/card"
import { Avatar } from "@/components/avatar"
import { StakeIcon } from "@/assets/icons/stake"

const sortbyArr = ['Amount', 'Voting Power', 'Lock time']
// const orderArr = ['Ascending', 'Decending']

export const StakeTable = () => {
  const { windowSize } = useWindowSize()
  const { userStakes } = useWeb3Context();
  const [ sortby, setSortby] = useState<string>(sortbyArr[0])
  // const [ order, setOrder ] = useState<string>(orderArr[0])
  
  const filteredStakeArr = useMemo(() => {
    if (!userStakes || userStakes.length < 2)
      return userStakes
    const arr = userStakes.sort((a: IStake, b: IStake) => {
      if (sortby === 'Amount' || sortby === 'Voting Power')
        return b.amount - a.amount 
      else if (sortby === 'Lock time')
        return b.lockPeriod - a.lockPeriod
      else 
        return b.reward
    })
    return arr
  }, [userStakes, sortby])

  return (
    <div className="flex flex-col gap-4 my-10 mb-[70px] lg:mt-[45px] w-full">
      {/* Sort by */}
      <div className="flex items-center gap-[4] lg:gap-8">
        <div className="flex items-center">
          <Typography variant="label-extrasmall" className="min-w-[40px] font-bold text-slate-500">Sort by</Typography>
          <Dropdown.Basic value={sortby} onChange={setSortby} list={sortbyArr} />
        </div>
        {/* <div className="flex items-center">
          <Typography variant="label-extrasmall" className="min-w-[40px] font-bold text-slate-500">Order</Typography>
          <Dropdown.Basic value={order} onChange={setOrder} list={orderArr} />
        </div> */}
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
        style={{
          maxWidth: `${windowSize.width - 40}px`,
        }}
      >
        <div className="rounded-[20px] bg-white min-w-[1080px]">
          <div className="px-10 py-5 w-full bg-slate-50 rounded-tl-[20px] rounded-tr-[20px]">
            <Typography variant="label-medium" className="font-bold">Staking</Typography>
          </div>
          <div className="px-5 pb-3 overflow-auto max-h-[770px]">
            <table className="w-full">
              <StakeTableHeader />
              {filteredStakeArr.length > 0 && <StakeTableBody stakeArr={filteredStakeArr}/>}
            </table>
            {filteredStakeArr.length < 1 && (
              <Card.Wrapper
                isShadow={false}
                classOverride={{
                  subContainer: 'bg-gradient-to-b from-slate-50 to-slate-50 p-0 flex flex-col justify-center items-center gap-3 h-[136px]'
                }}
              >
                <>
                  <Avatar 
                    className="w-[44px] h-[44px]"
                    icon={<StakeIcon />}
                  />
                  <Typography variant="label-small" className="font-bold">You still have No ORBK Staked</Typography>
                </>
              </Card.Wrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}