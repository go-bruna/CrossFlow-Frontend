import { Typography } from "@/components/typography"
import { CardWrapper } from "../variants/container.card"
import { BaseItem } from "./item.base"
import Paragraph from "@/components/paragraph"
import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"
import { StakeIcon } from "@/assets/icons/stake"

type Props = {
  balance: number | string
  amount: number | undefined
  price: number
  onChange?: (e: number | undefined) => void
}

export const ORBKItem = (props: Props) => {

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value === '') return props?.onChange && props.onChange(undefined)
    const v = Number(parseInt(e.target.value))
    props?.onChange && props.onChange(v)
  }

  return (
    <CardWrapper 
      isShadow={false}
      classOverride={{
        subContainer: 'bg-gradient-to-b from-white to-slate-100 flex flex-col gap-5'
      }}
    >
      <>
        <Paragraph.List
          label={
            <Typography variant="label-medium">Total <span className="font-bold">ORBK</span> Balance</Typography>
          }
          value={props.balance.toLocaleString()}
          classOverride={{
            value: 'text-base'
          }}
        />
        <div>
          <div className="flex justfiy-between items-center gap-2">
            <BaseItem 
              icon={<StakeIcon />}
              title="ORBK"
              classOverride={{
                icon: 'w-[38px] h-[38px]',
                title: 'text-[23px] font-bold',
                textGap: 'flex-row gap-0 items-center'
              }}
            />
            <div className="flex flex-1">
              <input 
                className={twMerge(
                  'w-full bg-transparent border-none focus:outline-none text-gray-900 text-[23px] text-right font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                )}
                type="number"
                value={props?.amount ?? ''}
                placeholder="0"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChangeValue(e)
                }
              />
            </div>
          </div>
          <Typography variant="label-medium" className="font-bold text-sky-400 text-right">
            {props.price === 0 ? `N/A` : `$${props.price.toLocaleString()}`}
          </Typography>
        </div>
      </>
    </CardWrapper>
  )
}