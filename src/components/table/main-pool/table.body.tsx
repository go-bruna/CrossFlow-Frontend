import { Icon } from "@/components/icon";
import { EthereumIMG } from "@/assets/icons/png";
import { Typography } from "@/components/typography";
import { useDrawer } from "@/contexts/interface";
import { IPool } from "@/types/api/pool";
import { numberFormat } from "@/utils";

export const MainPoolsTableBody = ({
  data
}: { 
  data: IPool[]
}) => {
  const { setDrawer } = useDrawer()

  const Row = ({ 
    row_data 
  }: {
    row_data: IPool
  }) => {
    return (
      <tr 
        className="h-[70px] text-[13px] hover:bg-[#90d5c8]/10"
        onClick={() => setDrawer({
          id: 'POOL',
          data: row_data
        })}
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Icon src={EthereumIMG} />
            <Typography variant="label-medium" className="text-[13px]">{row_data.asset_symbol}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.total_supply)} ${row_data.asset_symbol}`}</Typography>
            <Typography variant="label-medium" className="text-[13px]">{`$${numberFormat(row_data.total_supply_in_dollar)}`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.apy)}%`}</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">{`${numberFormat(row_data.apy2)}%`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.total_borrow)} ${row_data.asset_symbol}`}</Typography>
            <Typography variant="label-medium" className="text-[13px]">{`$${numberFormat(row_data.total_borrow_in_dollar)}`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.borrow_apy)}%`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.liquidity)} ${row_data.asset_symbol}`}</Typography>
            <Typography variant="label-medium" className="text-[13px]">{`$${numberFormat(row_data.liquidity_in_dollar)}`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end pr-7">
            <Typography variant="label-medium" className="text-[13px]">{`$${numberFormat(row_data.price)}`}</Typography>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tbody className="overflow-y-auto">
    {data.map((item, index) => (
      <Row 
        row_data={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}