import { useQuery } from '@tanstack/react-query'
import { GET_ASSET_SUPPLY_TRANSACTION } from '@/constants/query.ts'
import { getAssetSupplyTransaction } from '@/apis/pool'

export const useAssetSupplyTransaction= () => {
  const { data } = useQuery({
    queryKey: [GET_ASSET_SUPPLY_TRANSACTION],
    queryFn: async () => {
      return await getAssetSupplyTransaction()
    },
  })

  return { data }  
}
