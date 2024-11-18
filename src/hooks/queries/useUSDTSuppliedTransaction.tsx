import { useQuery } from '@tanstack/react-query'
import { GET_USDT_SUPPLY_TRANSACTION } from '@/constants/query.ts'
import { getUSDTSupplyTransaction } from '@/apis/pool'

export const useUSDTSupplyTransaction= () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_USDT_SUPPLY_TRANSACTION],
    queryFn: async () => {
      return await getUSDTSupplyTransaction()
    },
  })

  if (!data)
		return {
			data: null,
			isLoading
		}
    
  return { data, isLoading }  
}
