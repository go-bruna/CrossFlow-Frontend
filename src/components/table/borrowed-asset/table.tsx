import { IAccountAssetsBorrowed } from "@/types/api/account"
import { BorrowedAssetsTableBody } from "./table.body"
import { BorrowedAssetsTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"
// import Card from "@/components/card"
// import { Avatar } from "@/components/avatar"
// import { StakeIcon } from "@/assets/icons/stake"
// const orderArr = ['Ascending', 'Decending']

export const BorrowedAssetsTable = ({
  data
}: {
  data: IAccountAssetsBorrowed[]
}) => {
  const { windowSize } = useWindowSize()

  return (
    <div className="flex flex-col gap-4 my-5 mb-[70px] w-full">

      {/* Table */}
      <div 
        className="overflow-auto"
        style={{
          maxWidth: `${windowSize.width - 40}px`,
        }}
      >
        <div className="rounded-[10px] bg-[#101010] min-w-[1080px]">
          <div className="pb-3 overflow-auto max-h-[770px]">
            <table className="w-full">
              <BorrowedAssetsTableHeader />
              <BorrowedAssetsTableBody data={data}/>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}