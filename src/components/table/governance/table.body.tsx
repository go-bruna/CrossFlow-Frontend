import { Typography } from "@/components/typography";
import { StatusProps } from "@/types/interfaces";
import { Tag } from "@/components/tag";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

type Props = {
  data: any
}

export const GovernanceTableBody = (props: Props) => {
  const navigate = useNavigate()

  const Row = ({ data }: any) => {

    const statusClassOverride = {
      ongoing: 'bg-[#f6851b]/20 text-[#f6851b]',
      executed: 'bg-[#36f5cf]/20 text-[#36f5cf]',
      rejected: 'bg-[#e62d0f]/20 text-[#e62d0f]'
    }[data.status.toLowerCase() as StatusProps || 'ongoing'] as StatusProps

    const handleNavigate = () => {
      navigate(
        ROUTES.GOVERNANCE_DETAIL.replace(':id', data.proposal)
      )
    }

    return ( 
      <tr 
        className="h-[70px] text-[13px] hover:bg-[#90d5c8]/10"
        onClick={handleNavigate}
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Typography variant="label-medium" className="text-[13px]">{data.proposal}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col">
            <Typography variant="label-medium" className="text-[13px]">{data.title}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Tag 
              label={data.status}
              className={twMerge('w-[84px]', statusClassOverride)}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">{data.submit_time}</Typography>
            {/* <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">$982.15K</Typography> */}
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">{data.voting_start_time}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">{data.total_deposit}</Typography>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tbody className="overflow-y-auto">
    {props.data.map((item: any, index: number) => (
      <Row 
        data={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}