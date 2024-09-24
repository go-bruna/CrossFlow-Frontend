import { twMerge } from "tailwind-merge"

interface IAvatarProps {
  className?: string
  icon: JSX.Element
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}
export const Avatar = (props: IAvatarProps) => {
  return (
    <div 
      className={twMerge(`
        flex justify-center items-center w-[1.65rem] h-[1.65rem] rounded-full`, 
        props.className
      )}
      onClick={props?.onClick && props.onClick}
      onMouseEnter={props?.onMouseEnter && props.onMouseEnter}
      onMouseLeave={props?.onMouseLeave && props.onMouseLeave}
    >
      {props.icon}
    </div>
  )
}