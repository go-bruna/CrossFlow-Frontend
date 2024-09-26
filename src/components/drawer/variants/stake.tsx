
import Drawer from 'react-modern-drawer'
import Button from '@/components/button'
import Tab from '@/components/tab'
import Paragraph from '@/components/paragraph'
import { BaseProps } from '@/types/context/drawer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { twMerge } from 'tailwind-merge'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/input'
import { LogoIcon } from '@/assets/icons/logo'
import { Avatar } from '@/components/avatar'
import { Typography } from '@/components/typography'

export interface Props extends BaseProps {}

export const StakeDrawer = (props: Props) => {
  const { isDesktop } = useWindowSize()
  const [ amount, setAmount ] = useState<number | undefined>(undefined)

  return (
    <Drawer
      open={props.visible}
      onClose={props.onClose}
      direction={'right'}
      style={{
        width: isDesktop ? '520px' : '100%',
      }}
    >
        <div
          className={twMerge(
            'bg-[#101010] flex flex-col gap-5 h-full px-11 py-10',
          )}
        >
          {/* tabs */}
          <Tab.Item
            label='Stake'
          />

          <div className={'w-full'}>
            <Input 
              type="number"
              value={amount ?? ''}
              placeholder="0.00"
              icon={<LogoIcon />}
              innerButtonLabel="Max"
              onMax={() => {}}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Number(parseInt(e.target.value)))
              }
              classOverride={{
                container: 'mt-[14px]',
                inputContainer: 'bg-black',
                input: 'bg-black ml-1',
                value: 'text-base text-white',
                icon: 'w-8'
              }}
            />

            <Paragraph.List 
              label={(
                <div className="flex items-center gap-1">
                  <Avatar icon={<LogoIcon />} className="w-[16px] justify-start"/>
                  <Typography variant="label-medium" className="text-[13px] mt-0.5">Available CFN</Typography>
                </div>
              )}
              value={'113,312 CFN'}
              classOverride={{
                container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
                value: 'text-white'
              }}
            />

            {/* Button group */}
            <div className='flex flex-col gap-[25px]'>
              {amount && amount > 0 ? (
                <Button.Basic 
                  label="Stake"
                  className="w-full bg-[#0aab8b]"
                  onClick={() => {}}
                />
              ) : (
                <Button.Basic 
                  label="Enter valid amount"
                  className="w-full bg-[#36f5cf]/10"
                  onClick={() => {}}
                />
              )}
            </div>
          </div>
        </div>
    </Drawer>
  )
}
