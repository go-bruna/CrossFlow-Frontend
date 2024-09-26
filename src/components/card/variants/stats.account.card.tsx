import { BaseItem } from "@/components/card/base/item.base"
import { twMerge } from "tailwind-merge";

type Props = {
  labels: string[]
  values: string[] | number[]
  labelIcons?: (undefined | JSX.Element)[]
  valueColor?: string
}

export const AccountStatsbar = (props: Props) => {

  return (
    <div className="flex justify-between items-center lg:gap-[30px] bg-[#101010] p-5 mt-10 rounded-[10px]">
      <div className="flex justify-between lg:gap-[30px]">
        <BaseItem 
          title={props.labels[0]}
          suffixIcon={props?.labelIcons ? props.labelIcons[0] : undefined}
          description={props.values[0]}
          classOverride={{
            container: 'pr-6 gap-0',
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
            container: 'px-8 border-l border-[#5e7e8e]/20',
            title: 'crossflow-light font-normal',
            description: 'text-[19px] crossflow-semibold',
            textGap: 'gap-5'
          }}
        />
        <BaseItem 
          title={props.labels[2]}
          description={props.values[2]}
          classOverride={{
            container: 'px-8 border-l border-[#5e7e8e]/20',
            title: 'crossflow-light font-normal',
            description: 'text-[19px] crossflow-semibold',
            textGap: 'gap-5'
          }}
        />
        <BaseItem 
          title={props.labels[3]}
          description={props.values[3]}
          classOverride={{
            container: 'px-8 border-l border-[#5e7e8e]/20',
            title: 'crossflow-light font-normal',
            description: 'text-[19px] crossflow-semibold',
            textGap: 'gap-5'
          }}
        />
        <BaseItem 
          title={props.labels[4]}
          description={props.values[4]}
          classOverride={{
            container: 'px-8 border-l border-[#5e7e8e]/20',
            title: 'crossflow-light font-normal',
            description: 'text-[19px] crossflow-semibold',
            textGap: 'gap-5'
          }}
        />
      </div>
    </div>
  )
}