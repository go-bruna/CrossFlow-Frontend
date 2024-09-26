import { Icon } from "@/components/icon";
import { EthereumIMG } from "@/assets/icons/png";
import { Typography } from "@/components/typography";
import { MAIN_POOLS_TABLE_DATA } from "@/constants/table";
import { useDrawer } from "@/contexts/interface";


export const MainPoolsTableBody = () => {
  const { setDrawer } = useDrawer()

  const Row = ({ data }: any) => {
    return (
      <tr 
        className="h-[70px] text-[13px] hover:bg-[#90d5c8]/10"
        onClick={() => setDrawer({
          id: 'POOL'
        })}
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Icon src={EthereumIMG} />
            <Typography variant="label-medium" className="text-[13px]">{data.ticker}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">398.44K MERN</Typography>
            <Typography variant="label-medium" className="text-[13px]">$142.122</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">10.4%</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">78%</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">124.44K MERN</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">$982.15K</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">10.4%</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">224.12K MERM</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">$322.12K</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end pr-7">
            <Typography variant="label-medium" className="text-[13px]">$0.999122</Typography>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tbody className="overflow-y-auto">
    {MAIN_POOLS_TABLE_DATA.map((item, index) => (
      <Row 
        data={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}