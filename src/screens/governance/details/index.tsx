import Button from "@/components/button"
import Card from "@/components/card"
import Header from "@/components/layout/base/header"
import Tab from "@/components/tab"
import { GOVERNANCE_DETAIL_ITEM_DATA, PROPOSAL_NAV } from "@/constants"
import { useNavigate, useSearchParams } from "react-router-dom"
import { BackIcon } from "@/assets/icons/back"
import { Typography } from "@/components/typography"
import { VoteIcon } from "@/assets/icons/vote"
import { Avatar } from "@/components/avatar"
import { ThreeDotIcon } from "@/assets/icons/threedot"
import { Divider } from "@/components/divider"
import { useEffect, useState } from "react"
import { CommentContainer } from "../base/comments"
import { DescriptionContainer } from "../base/description"
import { useDrawer } from "@/contexts/interface"
import { useGovernanceProposalDetail } from "@/hooks/queries/useGovernanceProposalDetail"
import { dayDiff, numberFormat } from "@/utils"
import { queryClient } from "@/wagmi"
import { GET_GOVERNANCE_PROPOSAL_DETAIL } from "@/constants/query"
import { refineStatus, statusClassOverride } from "@/helper/status"
import { twMerge } from "tailwind-merge"
import GovernanceProposalsSkeleton from "./skeleton"
import dayjs from "dayjs"

export const GovernanceDetailPage = () => {
  const navigate = useNavigate()
  const { setDrawer } = useDrawer()
  const [ currentTab, setCurrentTab ] = useState<string>(PROPOSAL_NAV[0])
  const [searchParams] = useSearchParams()
  const proposal_id = searchParams.get('proposal_id') || undefined
  const { data: proposalDetail, isLoading } = useGovernanceProposalDetail(proposal_id)
  
  // invalidate queries
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_GOVERNANCE_PROPOSAL_DETAIL] }),
      // queryClient.invalidateQueries({ queryKey: [GET_GOVERNANCE_PROPOSALS] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])

  if (isLoading) {
    return <GovernanceProposalsSkeleton />
  }

  return (
    <div className="w-full animate-fade-in-up">
      <Header.Desktop title={'Proposals'} />

      {/* Container  */}
      <div className="mt-[30px]">
        <Button.Basic 
          label="Back"
          icon={<BackIcon />}
          className="justify-start bg-transparent gap-2 border-none items-center px-0"
          onClick={() => navigate(-1)}
        />

        {/* Type => Tag */}
        <div className="flex flex-col gap-[10px] mt-5">
          <div 
            className={twMerge(
              "flex justify-center items-center bg-[#f6851b]/10 text-[13px] text-[#f6851b] w-[83px] h-[26px] rounded-full capitalize",
              statusClassOverride(refineStatus(proposalDetail?.status))
            )}>
            {refineStatus(proposalDetail?.status)}
          </div>
        </div>

        {/* Vote button */}
        <div className="flex justify-between items-center mt-5 mb-3">
          <Typography variant="h5" className="text-[19px] crossflow-semibold">Cosmos Hub 3 Upgrade Proposal</Typography>
          <div className="flex justify-center items-center gap-[10px]">
            <Button.Basic 
              label="Vote"
              icon={<VoteIcon />}
              className="bg-gradient-to-b from-[#263b43] to-[#198975] rounded-full border-none w-[112px] h-[42px]"
              onClick={() => setDrawer({ 
                id : 'VOTING',
                proposal_id: proposalDetail?.id
              })}
            />
            <Avatar 
              icon={<ThreeDotIcon />}
              className="w-[38px] h-[38px] bg-[#101010] rounded-full"
              onClick={() => {}}
            />
          </div>
        </div>

        <Divider className="bg-[#36f5cf]/10" />

        <div className="flex items-center gap-5 mt-4">
          <Typography variant="label-medium" className="text-[13px] crossflow-light">{`by ${proposalDetail?.proposer ?? 'NaN'}`}</Typography>
          <Typography variant="label-medium" className="text-[13px] text-[#36f5cf] crossflow-regular">
            {`Proposed on: ${dayjs(proposalDetail?.voting_start_time).format('MM DD YYYY')}`}
          </Typography>
        </div>

        {/* StatsBar */}
        <Card.GovernanceDetailStatsBar 
          labels={GOVERNANCE_DETAIL_ITEM_DATA}
          values={[
            `${numberFormat(proposalDetail?.final_tally_result.yes_count)}`,
            `${numberFormat(proposalDetail?.final_tally_result.no_count)}`,
            `${numberFormat(proposalDetail?.final_tally_result.abstain_count)}`,
            `${dayDiff(proposalDetail?.voting_start_time, proposalDetail?.voting_end_time)}`,
            `${numberFormat(
              Number(proposalDetail?.final_tally_result.no_with_veto_count || 0) +
              Number(proposalDetail?.final_tally_result.yes_count || 0) + 
              Number(proposalDetail?.final_tally_result.no_count || 0) + 
              Number(proposalDetail?.final_tally_result.abstain_count || 0) 
            )} CFN`,
          ]}
        />

        {/* Nav Tab */}
        <Tab.Nav
          tabs={PROPOSAL_NAV}
          currentTab={currentTab}
          onSelect={setCurrentTab}
          classOverride={{
            container: 'my-8',
            currentTab: 'text-[#f29147]'
          }}
        />

        { currentTab === PROPOSAL_NAV[1] ? (
          <CommentContainer />
        ): (
          <DescriptionContainer />
        )}
      </div>
    </div>
  )
}