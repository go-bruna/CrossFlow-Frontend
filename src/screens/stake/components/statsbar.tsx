import Button from "@/components/button"
import Card from "@/components/card"
import { BaseItem } from "@/components/card/base/item.base"
import { Divider } from "@/components/divider";
import { WARNING_MESSAGE } from "@/constants/message";
import { useWeb3Context } from "@/contexts/web3";
import { useToast } from "@/hooks/useToast";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";


export const Statsbar = () => {
  const { isDesktop } = useWindowSize()
  const { messageApi } = useToast()
  const [ claiming, setClaiming ] = useState<boolean>(false)
  const { 
    loading,
    pending,
    completed,
    totalRewards,  
    writeClaim,
    tvl,
    totalBurnt,
    averageAPR,
    userStakes,
  } = useWeb3Context();
  
  const onClaimRewards = () => {
    if (totalRewards === 0)
      return messageApi.Alert({
        ...WARNING_MESSAGE,
        content: 'No amount to be claimed',
      })

    setClaiming(true)
    writeClaim()
  }

  useEffect(() => {
    if (completed) {
      setClaiming(false)
    }
  }, [completed])

  const DesktopStatsbar = () => (
    <Card.Wrapper
      isShadow={false}
      classOverride={{
        container: 'mt-[45px] max-w-[1180px]',
        subContainer: 'flex justify-between items-center lg:gap-[30px] bg-gradient-to-r from-white to-slate-200/80'
      }}
    >
      <>
        <div className="flex justify-between lg:gap-[30px]">
          <BaseItem 
            title="Total staked"
            description={`${tvl.toLocaleString()} ORBK`}
            classOverride={{
              container: 'w-[150px] border-r border-zinc-300 border-opacity-40',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
          <BaseItem 
            title="Total burned"
            description={`${totalBurnt.toLocaleString()} ORBK`}
            classOverride={{
              container: 'w-[150px] border-r border-zinc-300 border-opacity-40',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
          <BaseItem 
            title="Banking Power"
            description={userStakes.reduce((acc, curr) => acc+=curr.amount, 0).toLocaleString()}
            classOverride={{
              container: 'w-[150px] border-r border-zinc-300 border-opacity-40',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
          <BaseItem 
            title="Average APR"
            description={`${Number(averageAPR).toLocaleString()} %`}
            classOverride={{
              container: 'w-[150px] border-r border-zinc-300 border-opacity-40',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
          <BaseItem 
            title="Claimable rewards"
            description={`${Number(totalRewards.toFixed()).toLocaleString()} ORBK`}
            classOverride={{
              container: 'w-[150px]',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
        </div>
        <Card.Wrapper
          isShadow={false}
          classOverride={{
            container: 'rounded-[12px]',
            subContainer: 'p-0 rounded-[10px] w-[120px]'
          }}
        >
          {claiming && (loading || pending) ? (
            <div className='flex justify-center items-center py-3 bg-white rounded-[10px] w-full'>
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
          ) : (
            <Button.Basic
              className="w-full p-0 bg-white p-3 rounded-[10px]"
              textStyle="text-gray-900 text-[13px]"
              label="Claim Rewards"
              onClick={onClaimRewards}
            />
          )}
        </Card.Wrapper>
      </>
    </Card.Wrapper>
  )

  const MobileStatsbar = () => (
    <>
      <Card.Wrapper
        isShadow={false}
        classOverride={{
          container: 'mt-[45px] max-w-[454px]',
          subContainer: 'bg-gradient-to-r from-white to-slate-300'
        }}
      >
        <>
          <div className="flex justifiy-between gap-2 items-stretch">
            <BaseItem 
              title="Total staked"
              description={`${tvl.toLocaleString()} ORBK`}
              classOverride={{
                container: 'flex-1',
                title: 'text-slate-500 font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-[10px]'
              }}
            />
            <Divider 
              orientation="vertical"
              className="bg-zinc-300 bg-opacity-60 self-stretch h-auto"
            />
            <BaseItem 
              title="Total burned"
              description={`${totalBurnt.toLocaleString()} ORBK`}
              classOverride={{
                container: 'flex-1 ml-3',
                title: 'text-slate-500 font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-[10px]'
              }}
            />
          </div>

          <div className="flex justifiy-between gap-2 items-stretch mt-[30px]">
            <BaseItem 
              title="Banking Power"
              description={userStakes.reduce((acc, curr) => acc+=curr.amount, 0).toLocaleString()}
              classOverride={{
                container: 'flex-1',
                title: 'text-slate-500 font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-[10px]'
              }}
            />
            <Divider 
              orientation="vertical"
              className="bg-zinc-300 bg-opacity-60 self-stretch h-auto"
            />
            <BaseItem 
              title="Average APR"
              description={`${Number(averageAPR).toLocaleString()} %`}
              classOverride={{
                container: 'flex-1 ml-3',
                title: 'text-slate-500 font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-[10px]'
              }}
            />
          </div>
          <BaseItem 
            title="Claimable rewards"
            description={`${Number(totalRewards.toFixed()).toLocaleString()} ORBK`}
            classOverride={{
              container: 'flex-1 mt-[30px]',
              title: 'text-slate-500 font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-[10px]'
            }}
          />
        </>
      </Card.Wrapper>

       {/* Claim button */}
      <Card.Wrapper
        isShadow={false}
        classOverride={{
          container: ' mt-4 max-w-[454px]',
          subContainer: 'p-0 w-full'
        }}
      >
        {claiming && (loading || pending) ? (
          <div className='flex justify-center items-center py-5 bg-white rounded-[20px] w-full'>
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
        ) : (
          <Button.Basic
            className="w-full p-0 bg-white p-5 rounded-[20px]"
            textStyle="text-gray-900 text-[16px]"
            label="Claim Rewards"
            onClick={onClaimRewards}
          />
        )}
      </Card.Wrapper>
    </>
  )


  return (
    <>
      {isDesktop 
        ? DesktopStatsbar() 
        : MobileStatsbar()
      }
    </>
  )
}