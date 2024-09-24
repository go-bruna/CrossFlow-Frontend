import { twMerge } from "tailwind-merge"

type ClassOverride = {
  container?: string
  subContainer?: string
}
interface Props {
  children: JSX.Element
  classOverride?: ClassOverride
  isShadow?: boolean
  style?: any
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const CardWrapper = (props: Props) => {
  const shadow = props?.isShadow
  return (
    <div className={twMerge(
        "flex flex-col gap-5 bg-gradient-to-b from-zinc-300 to-sky-300 rounded-[20px] border p-[1px]", 
        shadow && 'shadow-md',
        props?.classOverride?.container
      )}
      style={props?.style}
      onClick={props?.onClick && props.onClick}
      onMouseEnter={props?.onMouseEnter && props.onMouseEnter}
      onMouseLeave={props?.onMouseLeave && props.onMouseLeave}
    >
      <div 
        className={twMerge(
          "bg-gradient-to-b from-white to-slate-200/80 w-full h-full p-5 rounded-[18px]",
          props?.classOverride?.subContainer
        )}
      >
        {props.children}
      </div>
    </div>
  )
}