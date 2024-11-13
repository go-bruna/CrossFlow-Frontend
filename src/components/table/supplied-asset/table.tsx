import { IAccountAssetsSupplies } from "@/types/api/account"
import { SuppliedAssetsTableBody } from "./table.body"
import { SuppliedAssetsTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"

export const SuppliedAssetsTable = ({
  data
}: {
  data: IAccountAssetsSupplies[]
}) => {
  const { windowSize } = useWindowSize()

  return (
    <div className="flex flex-col gap-4 my-5 mb-[20px] w-full">

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
              <SuppliedAssetsTableHeader />
              <SuppliedAssetsTableBody data={data}/>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}