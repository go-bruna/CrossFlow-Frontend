import { twMerge } from 'tailwind-merge'
import { Typography } from '../typography'
import { ChangeEvent } from 'react'

type InputType = 'text' | 'number' | 'hidden' | 'submit'

export interface ClassOverrideProps {
  container?: string
  inputContainer?: string
  input?: string
  value?: string
  icon?: string
}
interface Props {
  type?: InputType
  icon?: JSX.Element
  label?: string
  value: string | number
  defaultValue?: string
  placeholder?: string
  suffixLabel?: string
  suffixIcon?: JSX.Element | null
  disabled?: boolean
  innerButtonLabel?: string
  errorMsg?: string | null
  classOverride?: ClassOverrideProps
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onMax?: () => void
}

export const Input = (props: Props) => {
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    props?.onChange && props.onChange(e)
  }
  return (
    <div
      className={twMerge(
        'flex flex-col lg:p-0',
        props?.classOverride?.container
      )}
    >
      {props?.label && (
        <Typography 
          variant="label-medium" 
          className='text-[13px]'
        >
          {props.label}
        </Typography>
      )}
      <div
        className={twMerge(
          'flex justify-between items-center gap-2 bg-[#101010] border border-[#36f5cf]/10 px-3 py-[10px] rounded-lg',
          props?.classOverride?.inputContainer
        )}
      >
        <div className={"flex items-center gap-1 w-full"}>
          {props?.icon && (
            <div className={twMerge('w-[0.9rem]', props?.classOverride?.icon)}>
              {props.icon}
            </div>
          )}
          <input
            className={twMerge(
              'flex flex-1 bg-[#101010] border-none focus:outline-none text-zinc-100 text-[1.2rem]',
              props?.type === 'number' &&
                '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              props?.classOverride?.value,
              props?.classOverride?.input
            )}
            type={props?.type ?? 'text'}
            value={props?.value}
            placeholder={props?.placeholder}
            onChange={onChangeValue}
            disabled={props?.disabled ?? false}
          />

          {props?.innerButtonLabel && (
            <div
              className='bg-[#101010] rounded-lg cursor-pointer border border-[#36f5cf]/10'
              onClick={props?.onMax}
            >
              <Typography variant="label-small" className="text-[13px] font-medium px-3 py-[7px]">
                {props.innerButtonLabel}
              </Typography> 
            </div>
          )}
        </div>
        {props?.suffixLabel && (
          <Typography variant="label-medium" className="text-zinc-100">
            {props.suffixLabel}
          </Typography>
        )}
        {props?.suffixIcon && (
          <div
            className={twMerge('w-[0.9rem]', props?.classOverride?.icon)}
          >
            {props.suffixIcon}
          </div>
        )}
      </div>
      {props?.errorMsg && (
        <Typography variant='label-small' className='text-orange-500 my-1 ml-2'>
          {props.errorMsg}
        </Typography>
      )}
    </div>
  )
}
