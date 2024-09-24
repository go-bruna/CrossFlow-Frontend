import { twMerge } from "tailwind-merge"

interface Props {
  label: string
  className?: string
  onClick?: () => void
}
export const Tag = (props: Props) => {
  return (
    <div 
      className={twMerge(
        'flex justify-center items-center px-2 bg-[#f6851b]/20 text-amber-500 h-6 rounded-full',
        props?.onClick && 'cursor-pointer',
        props.className
      )} 
      onClick={props?.onClick ?? props.onClick}
    >
      <span>{props.label}</span>
    </div>
  )
}