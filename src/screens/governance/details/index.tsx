import Button from "@/components/button"
import Card from "@/components/card"
import Header from "@/components/layout/base/header"
import Tab from "@/components/tab"
import { GOVERNANCE_DETAIL_ITEM_DATA, PROPOSAL_NAV } from "@/constants"
import { useNavigate } from "react-router-dom"
import { BackIcon } from "@/assets/icons/back"
import { Typography } from "@/components/typography"
import { VoteIcon } from "@/assets/icons/vote"
import { Avatar } from "@/components/avatar"
import { ThreeDotIcon } from "@/assets/icons/threedot"
import { Divider } from "@/components/divider"
import { useState } from "react"
import { CommentContainer } from "../base/comments"
import { DescriptionContainer } from "../base/description"

export const GovernanceDetailPage = () => {
  const navigate = useNavigate()
  const [ currentTab, setCurrentTab ] = useState<string>(PROPOSAL_NAV[0])
  
  return (
    <div className="w-full">
      <Header.Desktop title={'Proposals'} />

      {/* Container */}
      <div className="mt-[30px]">
        <Button.Basic 
          label="Back"
          icon={<BackIcon />}
          className="justify-start bg-transparent gap-2 border-none items-center px-0"
          onClick={() => navigate(-1)}
        />

        {/* Type => Tag */}
        <div className="flex flex-col gap-[10px] mt-5">
          <div className="flex justify-center items-center bg-[#f6851b]/10 text-[13px] text-[#f6851b] w-[83px] h-[26px] rounded-full">
            Ongoing
          </div>
        </div>

        <div className="flex justify-between items-center mt-5 mb-3">
          <Typography variant="h5" className="text-[19px] crossflow-semibold">Cosmos Hub 3 Upgrade Proposal</Typography>
          <div className="flex justify-center items-center gap-[10px]">
            <Button.Basic 
              label="Vote"
              icon={<VoteIcon />}
              className="bg-gradient-to-b from-[#263b43] to-[#198975] rounded-full border-none w-[112px] h-[42px]"
              onClick={() => {}}
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
          <Typography variant="label-medium" className="text-[13px] crossflow-light">by Ox7B3c54e17d618CC94daDFe7671c1e2F50….</Typography>
          <Typography variant="label-medium" className="text-[13px] text-[#36f5cf] crossflow-regular">Proposed on: Sep 17th, 2024</Typography>
        </div>

        {/* StatsBar */}
        <Card.GovernanceDetailStatsBar 
          labels={GOVERNANCE_DETAIL_ITEM_DATA}
          values={['21', '11', '4', '2 Days', '223,213 CFN']}
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