import { Typography } from "@/components/typography";
import { useDrawer } from "@/contexts/interface";
import { IPool } from "@/types/api/pool";
import { getAssetDecimalObj, numberFormat, pureNumberFormat } from "@/utils";
import { useAssetProfile } from "@/hooks/queries/useAssetProfile";
import { Avatar } from "@/components/avatar";
import { getCoinIcon } from "@/utils/coin";

export const MainPoolsTableBody = ({
  data
}: { 
  data: IPool[]
}) => {
  const { setDrawer } = useDrawer()
  const { data: assetProfiles } = useAssetProfile()

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
					  <Avatar 
              className="w-6"
              icon={getCoinIcon(row_data.asset_symbol)} 
            />
            <Typography variant="label-medium" className="text-[13px]">{row_data.asset_symbol}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {`${pureNumberFormat(Number(row_data.total_supply) / getAssetDecimalObj(assetProfiles, row_data.asset_id).decimals, 4)} ${row_data.asset_symbol}`}
            </Typography>
            <Typography variant="label-medium" className="text-[13px]">
              {`$${numberFormat(row_data.total_supply_in_dollar)}`}
            </Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {`${numberFormat(row_data.apy)}%`}
            </Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">
              {`${numberFormat(row_data.apy2)}%`}
            </Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {`${pureNumberFormat(Number(row_data.total_borrow) / getAssetDecimalObj(assetProfiles, row_data.asset_id).decimals, 4)} ${row_data.asset_symbol}`}
            </Typography>
            <Typography variant="label-medium" className="text-[13px]">
              {`$${numberFormat(row_data.total_borrow_in_dollar)}`}
            </Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{`${numberFormat(row_data.borrow_apy)}%`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {`${pureNumberFormat(Number(row_data.liquidity) / getAssetDecimalObj(assetProfiles, row_data.asset_id).decimals, 4)} ${row_data.asset_symbol}`}
            </Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">
              {`$${numberFormat(row_data.liquidity_in_dollar)}`}
            </Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end pr-7">
            <Typography variant="label-medium" className="text-[13px]">{`$${pureNumberFormat(row_data.price, 4)}`}</Typography>
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