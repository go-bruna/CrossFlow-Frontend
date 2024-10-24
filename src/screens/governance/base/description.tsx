import { LogoIcon } from "@/assets/icons/logo"
import { Avatar } from "@/components/avatar"
import Paragraph from "@/components/paragraph"
import { Typography } from "@/components/typography"
import { refineStatus, statusClassOverride } from "@/helper/status"
import { useGovernanceProposalDetail } from "@/hooks/queries/useGovernanceProposalDetail"
import { pureNumberFormat } from "@/utils"
import dayjs from "dayjs"
import { useSearchParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"

export const DescriptionContainer = () => {
  const [searchParams] = useSearchParams()
  const proposal_id = searchParams.get('proposal_id') || undefined
  const { data: proposalDetail } = useGovernanceProposalDetail(proposal_id)
  
  return (
    <div className="flex flex-col gap-6 px-2.5 py-4 bg-[#101010] rounded-[10px]">
      {/* description content */}
      <div className="flex flex-col gap-5">
        <Typography 
          variant="label-medium" 
          className="text-[13px] crossflow-regular"
        >
          Gauntlet recommends the following risk recommendations to the protocol:
        </Typography>
        <ul className="list-disc mx-4">
          <li className="text-white text-[13px] crossflow-regular">Increase WETH Arbitrum Comet's ezETH Supply cap from 2,500 to 4,000</li>
          <li className="text-white text-[13px] crossflow-regular"> Increase WETH Optimism Comet's ezETH supply cap from 400 to 750</li>
        </ul>
        <Typography 
          variant="label-medium" 
          className="text-[13px] crossflow-regular"
        >
          The proposal updates the parameters by using the respective methods on the Configurator. By approving this proposal, you agree that any services provided by Gauntlet shall be governed by the terms of service available at gauntlet.network/tos
        </Typography>
      </div>

      {/* detail content */}
      <div className="flex flex-col gap-5">
        <Paragraph.List 
          label={'Proposal Status :'}
          value={refineStatus(proposalDetail?.status)}
          classOverride={{
            container: 'justify-start gap-12 capitalize',
            label: 'w-[114px] crossflow-regular',
            value: twMerge(
              'text-[#f6851b] crossflow-regular',
              statusClassOverride(refineStatus(proposalDetail?.status)),
              'bg-transparent'
            )
          }}
        />
        <Paragraph.List 
          label={'Deposit :'}
          value={(
            <div className="flex items-center">
              <Avatar icon={<LogoIcon />} className="justify-start"/>
              <Typography variant="label-medium" className="text-[13px] crossflow-regular">
                {`${pureNumberFormat(proposalDetail?.total_deposit?.reduce((res, curr) => res + Number(curr.amount), 0) ?? 0)} CFN`}
              </Typography>
            </div>
          )}
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'text-[#f6851b] crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Submit Time :'}
          value={proposalDetail?.submit_time 
            ? dayjs(proposalDetail.submit_time).format("DD MMM YYYY, h:mm:ss A, [UTC]") 
            : 'NaN'
          }
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Deposit End Time :'}
          value={proposalDetail?.deposit_end_time 
            ? dayjs(proposalDetail.deposit_end_time).format("DD MMM YYYY, h:mm:ss A, [UTC]") 
            : 'NaN'
          }
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Voting Start Time :'}
          value={proposalDetail?.voting_start_time 
            ? dayjs(proposalDetail.voting_start_time).format("DD MMM YYYY, h:mm:ss A, [UTC]") 
            : 'NaN'
          }
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Voting End Time :'}
          value={proposalDetail?.voting_end_time 
            ? dayjs(proposalDetail.voting_end_time).format("DD MMM YYYY, h:mm:ss A, [UTC]") 
            : 'NaN'
          }
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
      </div>
    </div>
  )
}