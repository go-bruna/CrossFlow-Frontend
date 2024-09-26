import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"

interface IClassOverride {
  container?: string
  currentTab?: string
}

type Props = {
  tabs: string[]
  currentTab: string
  onSelect: (tab: string) => void
  classOverride?: IClassOverride
}

export const NavTab = (props: Props) => {

  return (
    <div
      className={twMerge(
        "flex items-center gap-9 border-b border-[#36f5cf]/10",
        props.classOverride?.container
      )}
    >
      {props?.tabs?.map((tab: string, index: number) =>(
        <div
          key={index}
          onClick={() => props.onSelect(tab)}
          className=""
        >
          <Typography 
            variant="label-medium"
            className={twMerge(
              'text-[13px] pb-1.5 cursor-pointer text-white',
              tab.toLowerCase() === props.currentTab.toLowerCase() && 'border-b border-[#36f5cf]',
            )}
          >
            {tab}
          </Typography>
        </div> 
      ))}
    </div>
  )
}