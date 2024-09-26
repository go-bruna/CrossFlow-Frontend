import { Icon } from "@/components/icon";
import { EthereumIMG } from "@/assets/icons/png";
import { Typography } from "@/components/typography";
import { SUPPLIED_ASSETS_TABLE_DATA } from "@/constants/table";

export const SuppliedAssetsTableBody = () => {

  const Row = ({ data }: any) => {
    return (
      <tr 
        className="h-[68px] text-[13px] hover:bg-[#90d5c8]/10"
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Icon src={EthereumIMG} />
            <Typography variant="label-medium" className="text-[13px]">{data.ticker}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{data.apy_ltv}</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">{data.apy_ltv_percent}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{data.balance}</Typography>
            <Typography variant="label-medium" className="text-[13px]">{data.balance_price}</Typography>
          </div>
        </td>
        <td />
        <td />
        <td />
        <td />
      </tr>
    )
  }

  return (
    <tbody className="text-gray-900 overflow-y-auto">
    {SUPPLIED_ASSETS_TABLE_DATA.map((item, index) => (
      <Row 
        data={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}