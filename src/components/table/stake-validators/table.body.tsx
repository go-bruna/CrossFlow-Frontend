import Button from "@/components/button";
import { useDrawer } from "@/contexts/interface";
import { IValidator } from "@/types/api/stake";
import { getFixedNumber, pureNumberFormat, truncateAddress } from "@/utils";
import dayjs from "dayjs";

interface Props {
  validators: IValidator[]
}
interface IRowProps {
  data: IValidator
  index: number
}


const Row = ({ data, index }: IRowProps) => {
  const { setDrawer } = useDrawer()
  
  // Stake operation
  const handleDelegate = () => {
    setDrawer({ 
      id: 'STAKE',
      validator: data
    })
  }

  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{index}</td>
      <td>{truncateAddress(data.operator_address, 6)}</td>
      <td>
        {pureNumberFormat(Number(data.tokens) / 1e6)}
      </td>
      <td>{data.status}</td>
      <td>{pureNumberFormat(data.unbonding_height)}</td>
      <td>{dayjs(data.unbonding_time).format("DD MMM YYYY, HH:mm:ss")}</td>
      <td>{getFixedNumber(data.commission.commission_rates.rate)}</td>
      <td className="pr-5">
        <div className="flex items-center">
          <Button.Basic 
            label="Delegate"
            className="w-full bg-[#1b312b] py-1.5"
            onClick={handleDelegate}
          />
        </div>
      </td>
    </tr>
  )
}
export const StakeValidatorTableBody = ({ validators }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {validators.map((item: IValidator, index: number) => (
      <Row 
        data={item as IValidator} 
        index={index+1}
        key={index} 
      />
    ))}
    </tbody>
  )
}