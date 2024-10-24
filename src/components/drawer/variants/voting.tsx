
import Drawer from 'react-modern-drawer'
import Button from '@/components/button'
import Tab from '@/components/tab'
import Paragraph from '@/components/paragraph'
import { BaseProps } from '@/types/context/drawer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { twMerge } from 'tailwind-merge'
import { 
  ChangeEvent,
  useEffect, 
  useState 
} from 'react'
import { Input } from '@/components/input'
import { LogoIcon } from '@/assets/icons/logo'
import { Avatar } from '@/components/avatar'
import { Typography } from '@/components/typography'
import { ITag } from '@/types/interfaces'
import { queryClient } from '@/wagmi'
import { GET_GOVERNANCE_VOTES } from '@/constants/query'
// import { useGovernanceVotes } from '@/hooks/queries/useGovernanceVotes'

const tabs = [
  { title: 'Yes' },
  { title: 'No' },
  { title: 'Abstain' },
]
export interface Props extends BaseProps {
  proposal_id?: string
}

export const VotingDrawer = (props: Props) => {
  const { isDesktop } = useWindowSize()
  const [ currentTab, setCurrentTab ] = useState<ITag>(tabs[0])
  const [ amount, setAmount ] = useState<number | undefined>(undefined)
  // const { data: votes } = useGovernanceVotes(props.proposal_id)
  
  // invalidate queries
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_GOVERNANCE_VOTES] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])


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
          {/* voting amount */}
          <Paragraph.List 
            label={(
              <div className="flex items-center gap-2">
                <Avatar icon={<LogoIcon fill='#f6851b'/>} className="w-[16px] justify-start"/>
                <Typography variant="label-medium" className="text-[13px] mt-0.5">Your Voting Power</Typography>
              </div>
            )}
            value={'113,312 CFN'}
            classOverride={{
              container: 'pt-4 pb-5 border-b border-[#36f5cf]/10',
              value: 'text-white'
            }}
          />

          <div className={'w-full'}>
            <Input 
              label='Amount'
              type="number"
              value={amount ?? ''}
              placeholder="0.00"
              icon={<LogoIcon fill='#f6851b' />}
              innerButtonLabel="Max"
              onMax={() => {}}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(Number(parseInt(e.target.value)))
              }
              classOverride={{
                inputContainer: 'bg-black mt-[15px]',
                input: 'bg-black ml-1',
                value: 'text-base text-white',
                icon: 'w-8'
              }}
            />

            <Paragraph.List 
              label={(
                <div className="flex items-center gap-2">
                  <Avatar icon={<LogoIcon fill='#9747ff'/>} className="w-[16px] justify-start"/>
                  <Typography variant="label-medium" className="text-[13px] mt-0.5">Required Voting Power</Typography>
                </div>
              )}
              value={'3,312 CFN'}
              classOverride={{
                container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
                value: 'text-white'
              }}
            />

            <Tab.List 
              tabs={tabs}
              selected={currentTab}
              onSelect={setCurrentTab}
              classOverride={{
                container: 'justify-start w-auto rounded-full my-[25px] gap-2',
                tabButton: 'text-sm w-[90px] h-[34px]'
              }}
            />

            {/* Button group */}
            <div className='flex flex-col gap-[25px]'>
              {amount && amount > 0 ? (
                <Button.Basic 
                  label="Vote"
                  className="w-full bg-[#0aab8b]"
                  onClick={() => {}}
                />
              ) : (
                <Button.Basic 
                  label="Enter a valid amount"
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
