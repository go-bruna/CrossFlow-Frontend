import { twMerge } from "tailwind-merge"

export type Size = 'small' | 'medium' | 'large'
export type Orientation = 'horizontal' | 'vertical'

export interface Props {
  size?: Size
  orientation?: Orientation
  className?: string
}

export const Divider = (props: Props) => {
  const sizeStyle: { [k in Size]: string } = {
    small:
      props.orientation === 'vertical'
        ? 'w-[1px] min-w-[1px] h-full'
        : 'h-[1px] min-h-[1px] w-full',
    medium:
      props.orientation === 'vertical'
        ? 'w-[2px] min-w-[2px] h-full'
        : 'h-[2px] min-h-[2px] w-full',
    large:
      props.orientation === 'vertical'
        ? 'w-[8px] min-w-[8px] h-full'
        : 'h-[8px] min-h-[8px] w-full',
  }
  return (
    <div 
      className={twMerge(
        'bg-gray-100',
        sizeStyle[props.size ?? 'small'],
        props.className
      )}
    />
  )
}