import { LogoIcon } from "@/assets/icons/logo"
import { Avatar } from "@/components/avatar"
import Paragraph from "@/components/paragraph"
import { Typography } from "@/components/typography"

export const DescriptionContainer = () => {
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
          value={'Ongoing'}
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'text-[#f6851b] crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Deposit :'}
          value={(
            <div className="flex items-center">
              <Avatar icon={<LogoIcon />} className="justify-start"/>
              <Typography variant="label-medium" className="text-[13px] crossflow-regular">22 CFN</Typography>
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
          value={'9 Dec 2019, 9:52:09pm UTC'}
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Deposit End Time :'}
          value={'9 Dec 2019, 9:52:09pm UTC'}
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Voting Start Time :'}
          value={'9 Dec 2019, 9:52:09pm UTC'}
          classOverride={{
            container: 'justify-start gap-12',
            label: 'w-[114px] crossflow-regular',
            value: 'crossflow-regular'
          }}
        />
        <Paragraph.List 
          label={'Voting End Time :'}
          value={'9 Dec 2019, 9:52:09pm UTC'}
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