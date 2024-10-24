import { Typography } from "@/components/typography";
import { Tag } from "@/components/tag";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { IBaseProposal } from "@/types/api/governance";
import dayjs from "dayjs";
import { refineStatus, statusClassOverride } from "@/helper/status";
import { pureNumberFormat } from "@/utils";

type Props = {
  data: IBaseProposal[]
}

export const GovernanceTableBody = (props: Props) => {
  const navigate = useNavigate()

  const Row = ({ row }: {row: IBaseProposal}) => {
    const handleNavigate = () => {
      navigate(
        ROUTES.GOVERNANCE_DETAIL.replace(
          ROUTES.GOVERNANCE_DETAIL,
          `${ROUTES.GOVERNANCE_DETAIL}?proposal_id=${row.id}`
        )
      )
    }

    return ( 
      <tr 
        className="h-[70px] text-[13px] hover:bg-[#90d5c8]/10"
        onClick={handleNavigate}
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Typography variant="label-medium" className="text-[13px]">{row.id}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col">
            <Typography variant="label-medium" className="text-[13px]">{row.title}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Tag 
              label={refineStatus(row.status)}
              className={twMerge('w-[84px] capitalize', statusClassOverride(refineStatus(row.status)))}
            />
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {dayjs(row.submit_time).format("DD MMM YYYY, HH:mm:ss")}
            </Typography>
            {/* <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">$982.15K</Typography> */}
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {dayjs(row.voting_start_time).format("DD MMM YYYY, HH:mm:ss")}
            </Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px]  mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {`${pureNumberFormat(row.total_deposit?.reduce((res, curr) => res + Number(curr.amount), 0) ?? 0)} CFN`}
            </Typography>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tbody className="overflow-y-auto">
    {props.data.map((item: IBaseProposal, index: number) => (
      <Row 
        row={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}