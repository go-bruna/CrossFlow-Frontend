import { MouseEvent } from 'react'
import { Avatar } from '@/components/avatar'
import { Typography, Variant } from '@/components/typography'
import { twMerge } from 'tailwind-merge'

export interface IButtonBasicProps {
  label: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  icon?: JSX.Element
  className?: string
  textStyle?: string
  variant?: Variant
  iconStyle?: string
  trailIcon?: JSX.Element
  disabled?: boolean
}
export const ButtonBasic = (props: IButtonBasicProps) => {
  const onButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (props?.onClick) {
      e.stopPropagation()
      props.onClick(e)
    }
  }
  return (
    <button
      className={twMerge(
        `flex flex-1 justify-center items-center bg-[#101010] rounded-[5px] px-5 py-[14px] border border-[#36f5cf]/10`,
        props.className
      )}
      onClick={onButtonClick}
      disabled={props.disabled}
    >
      {props?.icon && (
        <Avatar className={props.iconStyle} icon={props.icon} />
      )}
      <Typography
        className={twMerge(
          'cursor-pointer text-base text-white',
          props?.textStyle
        )}
        variant={props?.variant ?? 'label-large'}
      >
        {props.label}
      </Typography>
      {props?.trailIcon && (
        <Avatar className={props?.iconStyle} icon={props.trailIcon} />
      )}
    </button>
  )
}
