import { CheckIcon } from "@/assets/icons/check"
import { LogoIcon } from "@/assets/icons/logo"
import { Avatar } from "@/components/avatar"
import Paragraph from "@/components/paragraph"
import { Typography } from "@/components/typography"
// import { useSearchParams } from "react-router-dom"
// import { useGovernanceProposalDetail } from "@/hooks/queries/useGovernanceProposalDetail"

export const CommentContainer = () => {
  // const [searchParams] = useSearchParams()
  // const proposal_id = searchParams.get('proposal_id') || undefined
  // const { data: proposalDetail } = useGovernanceProposalDetail(proposal_id)

  return (
    <div className="flex flex-col gap-6 px-2.5 py-4 bg-[#101010] rounded-[10px]">
      <div className="flex items-center gap-2">
        <Avatar icon={<LogoIcon />} />
        <Paragraph.List 
          label="Avantgarde"
          value="(OxB.948)"
          classOverride={{
            container: 'justify-start gap-2',
            label: 'crossflow-regular',
            value: 'text-[11px] crossflow-light mt-1',
          }}
        />
      </div>
      <Typography 
        variant="label-medium" 
        className="text-[13px] crossflow-regular"
      >
        The UAC has done a great work overseeing key parts of the DAO's operations
      </Typography>
      <div className="flex flex-col gap-2.5">
        <Paragraph.List 
          label="Deposit:"
          value={(
            <div className="flex items-center">
              <Avatar icon={<CheckIcon />} className="w-5 justify-start"/>
              <Typography variant="label-medium" className="text-[13px]">For</Typography>
            </div>
          )}
          classOverride={{
            container: 'justify-start gap-2',
            label: 'w-[120px] crossflow-light',
            value: 'crossflow-light'
          }}
        />
        <Paragraph.List 
          label="Voted:"
          value="9 Dec 2019, 9:52:09pm UTC"
          classOverride={{
            container: 'justify-start gap-2',
            label: 'w-[120px] crossflow-light',
            value: 'crossflow-light'
          }}
        />
      </div>
    </div>
  )
}