import Dropdown from "@/components/dropdown"
import { Typography } from "@/components/typography"
import { useState } from "react"
import { DelegateTableBody } from "./table.body"
import { DelegateTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"

const sortbyArr = ['Bribe Amount', 'Power', 'Term']
const orderArr = ['Ascending', 'Decending']

export const DeletegateTable = () => {
  const { windowSize } = useWindowSize()
  const [ sortby, setSortby] = useState<string>(sortbyArr[0])
  const [ order, setOrder ] = useState<string>(orderArr[0])
  
  return (
    <div className="flex flex-col gap-4 mt-[40px]">
      {/* Sort by */}
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <Typography variant="label-extrasmall" className="min-w-[40px] font-bold text-slate-500">Sort by</Typography>
          <Dropdown.Basic value={sortby} onChange={setSortby} list={sortbyArr} />
        </div>
        <div className="flex items-center">
          <Typography variant="label-extrasmall" className="min-w-[40px] font-bold text-slate-500">Order</Typography>
          <Dropdown.Basic value={order} onChange={setOrder} list={orderArr} />
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
        style={{
          maxWidth: `${windowSize.width - 40}px`,
        }}
      >
        <div className="rounded-[20px] overflow-auto bg-white min-w-[1080px]">
          <div className="px-10 py-5 w-full bg-slate-50 rounded-tl-[20px] rounded-tr-[20px]">
            <Typography variant="label-medium" className="font-bold">Available Listings</Typography>
          </div>
          <div className="px-5 pb-3">
            <table className="w-full">
              <DelegateTableHeader />
              <DelegateTableBody />
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}