import Card from "@/components/card"
import { BaseItem } from "@/components/card/base/item.base"
import { Divider } from "@/components/divider";
import { useWindowSize } from "@/hooks/useWindowSize";
import Paragraph from "@/components/paragraph";
import { Typography } from "@/components/typography";
import { Avatar } from "@/components/avatar";
import { LogoIcon } from "@/assets/icons/logo";

type Props = {
  labels: string[]
  values: string[] | number[]
}

export const MainPoolStatsbar = (props: Props) => {
  const { isDesktop } = useWindowSize()
 

  const DesktopStatsbar = () => (
    <div className="flex justify-between items-center lg:gap-[30px] bg-[#101010] p-5 mt-10 rounded-[10px]">
      <div className="flex justify-between lg:gap-[30px]">
        <Paragraph.List 
          label={props.labels[0]}
          value={props.values[0]}
          classOverride={{
            container: 'flex-col items-start pr-6 gap-5 min-w-[120px]',
            label: 'text-base crossflow-light',
            value: 'text-[19px] crossflow-semibold',
          }}
        />
        <Paragraph.List 
          label={props.labels[1]}
          value={props.values[1]}
          classOverride={{
            container: 'flex-col items-start px-6 border-l border-[#5e7e8e]/20 gap-5 min-w-[180px]',
            label: 'text-base crossflow-light',
            value: 'text-[19px] crossflow-semibold',
          }}
        />
        <Paragraph.List 
          label={props.labels[2]}
          value={props.values[2]}
          classOverride={{
            container: 'flex-col items-start px-6 border-l border-[#5e7e8e]/20 gap-5 min-w-[180px]',
            label: 'text-base crossflow-light',
            value: 'text-[19px] crossflow-semibold',
          }}
        />
        <Paragraph.List 
          label={props.labels[3]}
          value={(
            <div className="flex items-center gap-1">
              <Avatar icon={<LogoIcon/>}/>
              <Typography variant="label-medium" className="text-[19px] crossflow-semibold">{props.values[3]}</Typography>
            </div>
          )}
          classOverride={{
            container: 'flex-col items-start px-6 border-l border-[#5e7e8e]/20 gap-5 min-w-[200px]',
            label: 'text-base crossflow-light',
          }}
        />
        <Paragraph.List 
          label={props.labels[4]}
          value={props.values[4]}
          classOverride={{
            container: 'flex-col items-start px-6 border-l border-[#5e7e8e]/20 gap-5  min-w-[180px]',
            label: 'text-base crossflow-light',
            value: 'text-[19px] crossflow-semibold',
          }}
        />
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