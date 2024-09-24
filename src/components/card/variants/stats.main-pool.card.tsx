import Card from "@/components/card"
import { BaseItem } from "@/components/card/base/item.base"
import { Divider } from "@/components/divider";
import { useWindowSize } from "@/hooks/useWindowSize";
import { twMerge } from "tailwind-merge";

type Props = {
  labels: string[]
  values: string[] | number[]
  labelIcons?: JSX.Element[]
  valueColor?: string
}

export const MainPoolStatsbar = (props: Props) => {
  const { isDesktop } = useWindowSize()
 

  const DesktopStatsbar = () => (
    <div className="flex justify-between items-center lg:gap-[30px] bg-[#101010] p-5 mt-10 rounded-[10px]">
      <div className="flex justify-between lg:gap-[30px]">
        <BaseItem 
          title={props.labels[0]}
          suffixIcon={props?.labelIcons ? props.labelIcons[0] : undefined}
          description={props.values[0]}
          classOverride={{
            container: 'pr-14 border-r border-[#5e7e8e]/20 gap-0',
            title: 'crossflow-light font-normal',
            description: twMerge('text-[19px] crossflow-semibold', props?.valueColor),
            textGap: 'gap-5',
            icon: 'w-5 h-5'
          }}
        />
        <BaseItem 
          title={props.labels[1]}
          description={props.values[1]}
          classOverride={{
            container: 'pr-16 border-r border-[#5e7e8e]/20',
            title: 'crossflow-light font-normal',
            description: 'text-[19px] crossflow-semibold',
            textGap: 'gap-5'
          }}
        />
        {props.labels.length > 2 && (
          <>
            <BaseItem 
              title={props.labels[2]}
              description={props.values[2]}
              classOverride={{
                container: 'pr-12 border-r border-[#5e7e8e]/20',
                title: 'crossflow-light font-normal',
                description: 'text-[19px] crossflow-semibold',
                textGap: 'gap-5'
              }}
            />
            <BaseItem 
              title={props.labels[3]}
              description={props.values[3]}
              classOverride={{
                container: 'pr-12 border-r border-[#5e7e8e]/20',
                title: 'crossflow-light font-normal',
                description: 'text-[19px] crossflow-semibold',
                textGap: 'gap-5'
              }}
            />
            <BaseItem 
              title={props.labels[4]}
              description={props.values[4]}
              classOverride={{
                container: 'w-[150px]',
                title: 'crossflow-light font-normal',
                description: 'text-[19px] crossflow-semibold',
                textGap: 'gap-5'
              }}
            />
          </>
        )}
      </div>
    </div>
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
              title="Total Supply"
              description={`$2.12M`}
              classOverride={{
                container: 'flex-1',
                title: 'font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-5'
              }}
            />
            <Divider 
              orientation="vertical"
              className="bg-zinc-300 bg-opacity-60 self-stretch h-auto"
            />
            <BaseItem 
              title="Total Borrow"
              description={`$2.12M`}
              classOverride={{
                container: 'flex-1 ml-3',
                title: 'font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-5'
              }}
            />
          </div>

          <div className="flex justifiy-between gap-2 items-stretch mt-[30px]">
            <BaseItem 
              title="Available Liquidity"
              description={`$2.12M`}
              classOverride={{
                container: 'flex-1',
                title: 'font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-5'
              }}
            />
            <Divider 
              orientation="vertical"
              className="bg-zinc-300 bg-opacity-60 self-stretch h-auto"
            />
            <BaseItem 
              title="Daily ORBK Rewards"
              description={`$2.12M`}
              classOverride={{
                container: 'flex-1 ml-3',
                title: 'font-normal',
                description: 'text-base font-bold',
                textGap: 'gap-5'
              }}
            />
          </div>
          <BaseItem 
            title="Assets"
            description={`$2.12M`}
            classOverride={{
              container: 'flex-1 mt-[30px]',
              title: 'font-normal',
              description: 'text-base font-bold',
              textGap: 'gap-5'
            }}
          />
        </>
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