import { useQuery } from '@tanstack/react-query'
import { GET_REPAY_ESTIMATED_AMOUNT } from '@/constants/query.ts'
import { getEstimatedRepayAmount } from '@/apis/pool'

export const useEstimatedRepayAmount= (creator?: string, loan_id?:string, repay_percent?: string) => {
  const { data } = useQuery({
    queryKey: [GET_REPAY_ESTIMATED_AMOUNT],
    queryFn: async () => {
      return await getEstimatedRepayAmount(creator, loan_id, repay_percent)
    },
    enabled: !!creator && !!loan_id && !!repay_percent && Number(repay_percent) > 0 
  })

  if (!data)
		return {
			data: null,
		}

  return { data }  
}
