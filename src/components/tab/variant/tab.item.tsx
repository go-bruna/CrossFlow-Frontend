import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"

type ClassOverrideProps = {
  container?: string
  label?: string
}

type Props = {
  label: string
  icon?: JSX.Element
  classOverride?: ClassOverrideProps
}

export const TabItem = (props: Props) => {
  return (
    <div 
      className={twMerge(
        "flex justify-center items-center w-[86px] py-1 bg-[#203933] rounded-[100px] border border-[#36f5cf]/10 hover:bg-[#5e7e8e]/10", 
        props.classOverride?.container
      )}
    >
      <Typography variant="label-small" className={twMerge('text-[13px]', props?.classOverride?.label)}>{props.label}</Typography>
    </div>
  )
}