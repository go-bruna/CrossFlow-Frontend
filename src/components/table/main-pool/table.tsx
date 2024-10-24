import { IPool } from "@/types/api/pool"
import { MainPoolsTableBody } from "./table.body"
import { MainPoolsTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"
// import Card from "@/components/card"
// import { Avatar } from "@/components/avatar"
// import { StakeIcon } from "@/assets/icons/stake"
// const orderArr = ['Ascending', 'Decending']

export const MainPoolsTable = ({
  data
}: {
  data: IPool[]
}) => {
  const { windowSize } = useWindowSize()

  return (
    <div className="flex flex-col gap-4 my-10 mb-[70px] lg:mt-[45px] w-full">

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
              <MainPoolsTableHeader />
              <MainPoolsTableBody data={data}/>
            </table>
            {/* {filteredStakeArr.length < 1 && (
              <Card.Wrapper
                isShadow={false}
                classOverride={{
                  subContainer: 'bg-gradient-to-b from-slate-50 to-slate-50 p-0 flex flex-col justify-center items-center gap-3 h-[136px]'
                }}
              >
                <>
                  <Avatar 
                    className="w-[44px] h-[44px]"
                    icon={<StakeIcon />}
                  />
                  <Typography variant="label-small" className="font-bold">You still have No ORBK Staked</Typography>
                </>
              </Card.Wrapper>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}