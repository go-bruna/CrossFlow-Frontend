import { useQuery } from '@tanstack/react-query'
import { GET_REPAY_TRANSACTION } from '@/constants/query.ts'
import { getRepayTransactions } from '@/apis/pool'

export const useRepayTransaction= () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_REPAY_TRANSACTION],
    queryFn: async () => {
      return await getRepayTransactions()
    },
  })

  if (!data)
		return {
			data: null,
			isLoading
		}
    
  return { data, isLoading }  
}
