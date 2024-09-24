import { twMerge } from "tailwind-merge"

interface Props {
  src: string
  className?: string
  onClick?: () => void
}
export const Icon = (props: Props) => {
  return (
    <div className={twMerge(
        'flex justify-center items-center w-[1.6rem] h-[1.6rem]',
        props?.className
      )}
      onClick={props?.onClick && props.onClick}
    >
      <img src={props.src} alt="IMG" className="w-full"/>
    </div>
  )
}