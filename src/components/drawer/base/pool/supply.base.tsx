import { ChangeEvent, useState } from "react"
import Button from "@/components/button"
import Paragraph from "@/components/paragraph"
import { Input } from "@/components/input"
import { CustomProgress } from "@/components/progress"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import { Avatar } from "@/components/avatar"
import { ArrowRightIcon } from "@/assets/icons/arrow"

export const SupplyContainer = () => {
  const [ amount, setAmount ] = useState<number | undefined>(undefined)
  const [ inscribed, setInscribed ] = useState<boolean>(false)
  
  return (
    <div className="w-full mt-[30px]">
      {/* Search */}
      <Typography variant="label-medium" className="text-[13px] font-medium">Amount</Typography>

      <Input 
        type="number"
        value={amount ?? ''}
        placeholder="0.00"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        onMax={() => {}}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(parseInt(e.target.value)))
        }
        classOverride={{
          container: 'mt-[14px]',
          inputContainer: 'bg-black',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      <Paragraph.List
        label="Suppliable amount" 
        value={'14.15 POLY'}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <Paragraph.List
        label="Total APY" 
        value={'4.21%'}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <CustomProgress 
        headerLabels={['Current:', 'Max:']}
        headerValues={['$0', '$0']}
        current="0"
        limit="80"
        classOverride={{
          container: 'mt-4 mb-3',
          text: 'text-[13px]'
        }}
      />
      <Paragraph.List
        label="Supply balance (USDT)" 
        value={(
          <div className="flex items-center gap-1">
            {!amount || amount <= 0 ? (
              <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
            ) : (
              <>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
                <Avatar icon={<ArrowRightIcon />} className="w-5"/>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
              </>
            )}
          </div>
        )}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />
      <Paragraph.List
        label="Borrow limit" 
        value={'$0'}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />
      <Paragraph.List
        label="Daily earnings" 
        value={(
          <div className="flex items-center gap-1">
            {!amount || amount <= 0 ? (
              <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
            ) : (
              <>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
                <Avatar icon={<ArrowRightIcon />} className="w-5"/>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
              </>
            )}
          </div>
        )}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />

      {/* Button group */}
      <div className="flex flex-col gap-6">
      {!amount || amount <= 0 ? (
        <>
          <div className="flex flex-col gap-2.5 mt-8 ">
            <Button.Basic 
              label="Enter valid amount"
              className={twMerge(
                "w-full bg-[#36f5cf]/10",
                // 'hover:bg-[#0aab8b]'
              )}
              onClick={() => {}}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2.5 mt-8">
            <Typography 
              variant="label-medium" 
              className={twMerge("text-[13px]", inscribed && 'text-[#5e7e8e]')}
            >
              Step1
            </Typography>
            <Button.Basic 
              label="Inscribe Tokens"
              className={twMerge(
                "w-full bg-[#0aab8b]",
                inscribed && 'bg-[#36f5cf]/10',
                // 'hover:bg-[#0aab8b]'
              )}
              onClick={() => setInscribed(true)}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <Typography 
              variant="label-medium" 
              className={twMerge("text-[13px]", !inscribed && 'text-[#5e7e8e]')}
            >
              Step2
            </Typography>
            <Button.Basic 
              label="Supply"
              className={twMerge(
                "w-full bg-[#36f5cf]/10",
                inscribed && 'bg-[#0aab8b]',
                // 'hover:bg-[#0aab8b]'
              )}
              onClick={() => setInscribed(false)}
            />
          </div>
        </>
      )}
      </div>
    </div>
  )
}