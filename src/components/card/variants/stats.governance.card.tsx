import { LogoIcon } from "@/assets/icons/logo"
import { Avatar } from "@/components/avatar"
import Paragraph from "@/components/paragraph"
import { Typography } from "@/components/typography"

type Props = {
  labels: string[]
  values: string[] | number[]
}

export const GovernanceStatsbar = (props: Props) => {

  return (
    <div className="flex justify-between items-center lg:gap-[30px] bg-[#101010] p-5 mt-10 rounded-[10px]">
      <div className="flex justify-between lg:gap-[30px]">
        <Paragraph.List 
          label={props.labels[0]}
          value={props.values[0]}
          classOverride={{
            container: 'flex-col items-start pr-6 gap-5',
            label: 'text-base crossflow-light',
            value: 'text-[19px] crossflow-semibold',
          }}
        />
        <Paragraph.List 
          label={props.labels[1]}
          value={(
            <div className="flex items-center gap-1">
              <Avatar icon={<LogoIcon fill="#f6851b"/>}/>
              <Typography variant="label-medium" className="text-[19px] crossflow-semibold">{props.values[1]}</Typography>
            </div>
          )}
          classOverride={{
            container: 'flex-col items-start px-6 border-l border-[#5e7e8e]/20 gap-5',
            label: 'text-base crossflow-light',
          }}
        />
      </div>
    </div>
  )
}