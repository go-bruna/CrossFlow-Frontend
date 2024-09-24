import { DelegateMediumIcon } from "@/assets/icons/delegate"
import Button from "@/components/button"
import { BaseItem } from "@/components/card/base/item.base"

export const DelegateTableBody = () => {
  const Row = (data: any) => {
    console.log(data)
    return (
      <tr className="h-[70px] text-[13px] hover:bg-slate-50 font-semibold">
        <td className="pl-5">
          <BaseItem 
            icon={<DelegateMediumIcon />}
            title={'Luffy'}
            classOverride={{
              icon: 'w-[43px] h-[43px]',
              title: 'font-bold text-[13px]',
              textGap: 'flex-row items-center'
            }}
          />
        </td>
        <td>{'1.2 USDC'}</td>
        <td>{'12,124 ORBK'}</td>
        <td>{'133 days'}</td>
        <td>
          <Button.Basic 
            className="px-6 py-2 rounded-full"
            variant="label-small"
            textStyle="text-[13px]"
            label="Supply"
            onClick={() => {}}
          />
        </td>
      </tr>
    )
  }
  return (
    <tbody className="text-gray-900">
    {[1,2,3,4,5,6,7].map((row, index) => (
      <Row data={row} key={index} />
    ))}
    </tbody>
  )
}