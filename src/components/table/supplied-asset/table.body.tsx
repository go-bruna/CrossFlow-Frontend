import { Icon } from "@/components/icon";
import { EthereumIMG } from "@/assets/icons/png";
import { Typography } from "@/components/typography";
import { IAccountAssetsSupplies } from "@/types/api/account";
import { getAssetDecimalObj, numberFormat, pureNumberFormat } from "@/utils";
import { useAssetProfile } from "@/hooks/queries/useAssetProfile";

export const SuppliedAssetsTableBody = ({
  data
}: {
  data: IAccountAssetsSupplies[]
}) => {
  const { data: assetProfiles } = useAssetProfile()

  const Row = ({ row }: {row: IAccountAssetsSupplies}) => {
    return (
      <tr 
        className="h-[68px] text-[13px] hover:bg-[#90d5c8]/10"
      >
        <td>
          <div className="flex items-center gap-2 pl-5">
            <Icon src={EthereumIMG} />
            <Typography variant="label-medium" className="text-[13px]">{row.asset_symbol}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">{numberFormat(row.apy)}</Typography>
            <Typography variant="label-medium" className="text-[13px] text-[#36f5cf]">{`${numberFormat(row.loan_rate)}%`}</Typography>
          </div>
        </td>
        <td>
          <div className="flex flex-col gap-[2px] items-end mr-2">
            <Typography variant="label-medium" className="text-[13px]">
              {pureNumberFormat(Number(row.balance) / getAssetDecimalObj(assetProfiles, row.asset_id).decimals, 4)}
            </Typography>
            <Typography variant="label-medium" className="text-[13px]">
              {pureNumberFormat(Number(row.balance) / getAssetDecimalObj(assetProfiles, row.asset_id).decimals, 4)}
            </Typography>
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
    {data.map((item: IAccountAssetsSupplies, index: number) => (
      <Row 
        row={item}
        key={index} 
      />
    ))}
    </tbody>
  )
}