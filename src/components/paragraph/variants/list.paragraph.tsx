import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"

type ClassOverride = {
  container?: string
  label?: string
  value?: string
}
type Props = {
  label: string | JSX.Element
  value: string | number | JSX.Element
  classOverride?: ClassOverride
}
export const ParagraphList = ({ label, value, classOverride}: Props) => {
  return (
    <div>
      <div className={twMerge("flex justify-between items-center w-full", classOverride?.container)}>
        {typeof label === 'string' ? (
          <Typography variant="label-small" className={twMerge('text-[13px]', classOverride?.label)}>{label}</Typography>
        ) : (
          (label)
        )}
        {typeof value === 'string' || typeof value === 'number' ? (
          <Typography variant="label-small" className={twMerge("text-[13px]", classOverride?.value)}>{value}</Typography>
        ) : (
          (value)
        )}
      </div>
    </div>
  )
}