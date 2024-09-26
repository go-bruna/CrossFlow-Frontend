import { twMerge } from "tailwind-merge"
import { Typography } from "../typography"

type ClassOverrideProps = {
  container?: string
  label?: string
}
type Props = {
  label?: number
  classOverride?: ClassOverrideProps
}
export const Badge = (props: Props) => {
  return (
    <div className={twMerge('flex justify-center items-center w-[15px] h-[15px] bg-[#d81e00] rounded-full', props?.classOverride?.container)}>
      {props?.label && (
        <Typography 
          variant="label-small" 
          className={twMerge(
            'text-[10.5px] crossflow-bold leading-[16px] mr-[1px]', 
            props?.classOverride?.label
          )}
        >
          {props.label}
        </Typography>
      )}
    </div>
  )
}