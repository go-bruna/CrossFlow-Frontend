// import { StakeIcon } from "@/assets/icons/stake";
// import { BaseItem } from "@/components/card/base/item.base"
import Button from "@/components/button"
import { DURATIONS_TIME } from "@/constants";
import { useWeb3Context } from "@/contexts/web3";
import { IStake } from "@/types/context/web3";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import dayjs from 'dayjs';
import { useToast } from "@/hooks/useToast";
import { WARNING_MESSAGE } from "@/constants/message";

interface Props {
  stakeArr: IStake[]
}
interface IRowProps {
  data: IStake
}

const Row = ({ data }: IRowProps) => {
  const { 
    loading,
    pending,
    completed, 
    writeRedeemByIndex 
  } = useWeb3Context();
  const { messageApi } = useToast()
  const {amount, lockPeriod, reward, startTime, burnPercentage} = data;
  const [ unstaking, setUnstaking ] = useState<boolean>(false)
  
  const _date = dayjs().valueOf()
  const _unlocked_date = dayjs(startTime * 1000 + (DURATIONS_TIME.find(e => e.index === lockPeriod)?.maxDuration ?? DURATIONS_TIME[0].maxDuration )* 1000)
  const diff = _unlocked_date.diff(_date, 'day')
  
  const onUnstake = () => {
    console.log("row ====", data)
    if (loading || pending) {
      return messageApi.Alert({...WARNING_MESSAGE, content: 'Wait until current transaction is finished.'})
    }
    setUnstaking(true)
    writeRedeemByIndex(0,0, data.index);

  }

  useEffect(() => {
    if (completed) {
      setUnstaking(false)
    }
  }, [completed])

  return (
    <tr className="h-[70px] text-[13px] hover:bg-slate-50 font-semibold">
      {/* <td className="pl-5">
        <BaseItem 
          icon={<StakeIcon />}
          title={'ORBK'}
          description={'OrdiBank'}
          classOverride={{
            icon: 'w-[43px] h-[43px]',
            title: 'font-bold text-[13px]',
          }}
        />
      </td> */}
      <td className="pl-5">{`${amount.toLocaleString()} ORBK`}</td>
      <td>{amount.toLocaleString()}</td>
      <td>{`${DURATIONS_TIME.find(e => e.index === lockPeriod)?.period ?? 3} months`}</td>
      <td>{`${diff} day(s)`}</td>
      <td>{`${burnPercentage} %`}</td>
      <td>{`${reward.toLocaleString()} ORBK`}</td>
      <td>
          {unstaking ? (
            <div className="flex flex-1 justify-start items-center">
              <div className='flex justify-center items-center py-2 rounded-full bg-gray-900 hover:bg-zinc-900 rounded-full w-[98px]'>
                <TailSpin
                  visible={true}
                  height="21.5"
                  width="20"
                  color="#38bdf8"
                  ariaLabel="tail-spin-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-1 justify-start">
              <Button.Basic 
                className="px-6 py-2 rounded-full w-[98px] flex-none"
                variant="label-small"
                textStyle="text-[13px]"
                label="Unstake"
                onClick={onUnstake}
              />
            </div>
          )}
      </td>
    </tr>
  )
}

export const StakeTableBody = ({ stakeArr }: Props) => {
  return (
    <tbody className="text-gray-900 overflow-y-auto">
    {stakeArr.map((item, index) => (
      <Row 
        data={item as IStake} 
        key={index} 
      />
    ))}
    </tbody>
  )
}