import { useQuery } from '@tanstack/react-query'
import { GET_LOAN_ENTITY } from '@/constants/query.ts'
import { getLoanEntity } from '@/apis/pool'

export const useLoanEntity= () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_LOAN_ENTITY],
    queryFn: async () => {
      return await getLoanEntity()
    },
  })

  if (!data)
		return {
			data: null,
			isLoading
		}

  return { data }  
}
