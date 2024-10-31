
import Drawer from 'react-modern-drawer'
import Button from '@/components/button'
import Tab from '@/components/tab'
import Paragraph from '@/components/paragraph'
import { BaseProps } from '@/types/context/drawer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { twMerge } from 'tailwind-merge'
import { 
  // ChangeEvent,
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
import { useStakeSummary } from '@/hooks/queries/useStakeSummary'
import { useAccount, useOfflineSigners } from 'graz'
import { pureNumberFormat } from '@/utils'
import { refineVoteStatus } from '@/helper/status'
import { useToast } from '@/hooks/useToast'
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL } from '@/constants/message'
import { TxClient } from '@/cf-client/client'
import { MsgVote } from '@/cf-client/cosmos.gov/tx'
import { TailSpin } from 'react-loader-spinner'
// import { processVoting } from '@/apis/cfn-client'

const tabs = [
  { title: 'Yes' },
  { title: 'No' },
  { title: 'Abstain' },
]
export interface Props extends BaseProps {
  proposal_id?: string
}

export const VotingDrawer = (props: Props) => {
  const { messageApi } = useToast();
  const { isDesktop } = useWindowSize()
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: stakeSummary } = useStakeSummary(account?.bech32Address)
  const [ currentTab, setCurrentTab ] = useState<ITag>(tabs[0])
  const [loading, setLoading] = useState<boolean>(false)
  // const [ amount, setAmount ] = useState<number | undefined>(undefined)  

  // Handle Vote
  const handleVote = async () => {
    try {

      if (!window.keplr) {
        return messageApi.Alert(WALLET_INSTALL("Kelpr"));
      }
      if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
        return messageApi.Alert(FAILED_WALLET_CONNECTION);
      }

      const voteData: MsgVote = {
        proposalId: Number(props?.proposal_id ?? "0"),
        voter: account?.bech32Address,
        option: refineVoteStatus(currentTab.title),
        metadata: 'metadata'
      }

      setLoading(true)
      const client = await TxClient(offlineSigners?.offlineSigner);
      let msg = await client.msgVote(voteData);
      const result = await client.signAndBroadcast([msg]);
      console.log("voting result ====>", result);
      setLoading(false)

    } catch (error) {
      console.log("handle Voting Msg Error ==>", error)
    }
  }

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
            value={`${pureNumberFormat(stakeSummary?.total_staked)}`}
            classOverride={{
              container: 'pt-4 pb-5 border-b border-[#36f5cf]/10',
              value: 'text-white'
            }}
          />

          <div className={'w-full'}>
            <Input 
              label='Amount'
              type="number"
              // value={amount ?? ''}
              value={Number(stakeSummary?.total_staked ?? 0)}
              placeholder="0.00"
              icon={<LogoIcon fill='#f6851b' />}
              innerButtonLabel="Max"
              onMax={() => {}}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   setAmount(Number(e.target.value || 0))
              // }}
              classOverride={{
                inputContainer: 'bg-black mt-[15px]',
                input: 'bg-black ml-1',
                value: 'text-base text-white',
                icon: 'w-8'
              }}
              disabled={true}
            />

            {/* <Paragraph.List 
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
            /> */}

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
              {loading ? (
                <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[14px]">
                  <TailSpin
                    visible={true}
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : Number(stakeSummary?.total_staked ?? 0) > 0 ? (
              // {amount && amount > 0  && amount < Number(stakeSummary?.total_staked ?? 0) ? (
                <Button.Basic 
                  label="Vote"
                  className="w-full bg-[#0aab8b]"
                  onClick={handleVote}
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
